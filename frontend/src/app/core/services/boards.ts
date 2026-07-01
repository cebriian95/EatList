import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Board } from '../models/board.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class Boards {

  supabase = inject(Supabase);

  boards = signal<Board[]>([]);
  private channel: any = null;

  constructor() {
    this.subscribeToBoards();
  }

  cleanup() {
    if (this.channel) {
      this.supabase.client.removeChannel(this.channel);
      this.channel = null;
    }
  }

  async getBoards() {
    const { data, error } = await this.supabase.client.from('boards').select('*');
    if (error) {
      console.error('Error trayendo boards:', error);
    } else {
      this.boards.set(data || []);
    }
  }

  async getBoardById(id: number) {
    const { data, error } = await this.supabase.client.from('boards').select('*').eq('id', id);
    if (error) {
      console.error('Error trayendo board:', error);
      return null;
    }
    return data && data.length > 0 ? data[0] : null;
  }

  async addBoard(name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error, data } = await this.supabase.client.from('boards').insert({ name, password: hashedPassword }).select('id');
    if (error) {
      console.error('Error añadiendo board:', error);
      return null;
    }
    return data && data[0] ? data[0] : null;
  }

  async updateBoard(id: number, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await this.supabase.client.from('boards').update({ name, password: hashedPassword }).eq('id', id);
    if (error) {
      console.error('Error actualizando board:', error);
    }
  }

  async deleteBoard(id: number) {
    const { error } = await this.supabase.client.from('boards').delete().eq('id', id);
    if (error) {
      console.error('Error eliminando board:', error);
    }
  }

  subscribeToBoards() {
    this.channel = this.supabase.client
      .channel('boards')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'boards' }, _ => {
        this.getBoards();
      }).subscribe();
  }

}
