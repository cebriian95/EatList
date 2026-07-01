import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Rating as RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class Rating {

  supabase = inject(Supabase);

  ratings = signal<RatingModel[]>([]);
  private channel: any = null;

  constructor() {
    this.getRatings();
    this.subscribeToRatings();
  }

  cleanup() {
    if (this.channel) {
      this.supabase.client.removeChannel(this.channel);
      this.channel = null;
    }
  }

  async getRatings() {
    const { data, error } = await this.supabase.client.from('ratings').select('*');
    if (error) {
      console.error('Error trayendo ratings:', error);
    } else {
      this.ratings.set(data || []);
    }
  }

  async addRating(spotId: string, nickname: string, score: number) {
    const { error } = await this.supabase.client.from('ratings').insert({ spot_id: spotId, nickname, score });
    if (error) {
      console.error('Error añadiendo rating:', error);
    }
  }

  async deleteRating(id: string) {
    const { error } = await this.supabase.client.from('ratings').delete().eq('id', id);
    if (error) {
      console.error('Error eliminando rating:', error);
    }
  }


  subscribeToRatings() {
    this.channel = this.supabase.client
      .channel('ratings')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'ratings' }, _ => {
          this.getRatings();
        }).subscribe();
  }

}
