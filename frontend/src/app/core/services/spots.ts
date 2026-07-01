import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Spot } from '../models/spot.model';




@Injectable({
  providedIn: 'root',
})
export class Spots {

  supabase = inject(Supabase);

  spots = signal<Spot[]>([]);
  currentBoardId: string = '';
  private channel: any = null;

  init(board_id: string) {
    this.currentBoardId = board_id;
    this.subscribeToSpots(board_id);
    this.getSpots(board_id);
  }

  cleanup() {
    if (this.channel) {
      this.supabase.client.removeChannel(this.channel);
      this.channel = null;
    }
  }

  async getSpots(board_id: string) {
    const { data, error } = await this.supabase.client.from('spots').select('*').eq('board_id', board_id);
    if (error) {
      console.error('Error trayendo spots:', error);
    } else {
      this.spots.set(data || []);
    }
  }
  
  async addSpot(title: string, location: string, location_map: string, board_id: string, visited: boolean = false) {
    const { error } = await this.supabase.client.from('spots').insert({ title, location, location_map, board_id, visited });
    if (error) {
      console.error('Error añadiendo spot:', error);
    }
  }

  async updateSpot(id: string, title: string, location: string, location_map: string, visited?: boolean): Promise<boolean> {
    const updates: any = { title, location, location_map };
    if (visited !== undefined) {
      updates.visited = visited;
    }
    const { error } = await this.supabase.client.from('spots').update(updates).eq('id', id);
    if (error) {
      console.error('Error actualizando spot:', error);
      return false;
    }
    
    const currentSpots = this.spots().map(s => 
      s.id === id ? { ...s, title, location, location_map, ...(visited !== undefined ? { visited } : {}) } : s
    );
    this.spots.set(currentSpots);
    return true;
  }

  async markVisited(id: string): Promise<boolean> {
    const { error } = await this.supabase.client.from('spots').update({ visited: true }).eq('id', id);
    if (error) {
      console.error('Error actualizando spot:', error);
      return false;
    }
    
    const currentSpots = this.spots().map(s => 
      s.id === id ? { ...s, visited: true } : s
    );
    this.spots.set(currentSpots);
    return true;
  }

  async deleteSpot(id: string): Promise<boolean> {
    const { error } = await this.supabase.client.from('spots').delete().eq('id', id);
    if (error) {
      console.error('Error eliminando spot:', error);
      return false;
    }
    
    const currentSpots = this.spots().filter(s => s.id !== id);
    this.spots.set(currentSpots);
    return true;
  }

  subscribeToSpots(board_id: string) {
    this.channel = this.supabase.client
      .channel(`spots-${board_id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'spots', filter: `board_id=eq.${board_id}` }, _ => {
          this.getSpots(board_id);
        }).subscribe();
  }

}
