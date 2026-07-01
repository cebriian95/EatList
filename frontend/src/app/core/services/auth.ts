import { inject, Injectable } from '@angular/core';
import { Boards } from './boards';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  boards = inject(Boards);


  async checkPassword(id: number, password: string): Promise<boolean> {
    const board = await this.boards.getBoardById(id);
    if (board && bcrypt.compareSync(password, board.password)) {
      localStorage.setItem('currentBoard', id.toString());
              
      const recentBoards = JSON.parse(localStorage.getItem('recentBoards') || '[]');
      if (!recentBoards.find((board: any) => board.id === id)) {
        recentBoards.push({ id, name: board.name, password });
      } else {
        const recentBoardIndex = recentBoards.findIndex((board: any) => board.id === id);
        recentBoards[recentBoardIndex] = { id, name: board.name, password };
      }
      localStorage.setItem('recentBoards', JSON.stringify(recentBoards));
      return true;
    }
    return false;
  }

  async isAuthenticated(): Promise<boolean> {
    const currentBoardId = this.getCurrentBoard();
    if (!currentBoardId) {
      return false;
    }
    const board = await this.boards.getBoardById(currentBoardId);
    return board !== null;
  }

  logout(): void {
    localStorage.removeItem('currentBoard');
  }

  nicknameStorage(nickname: string): void {
    localStorage.setItem('nickname', nickname);
  }

  getNickname(): string | null {
    return localStorage.getItem('nickname');
  }

  getCurrentBoard(): number | null {
    const boardId = localStorage.getItem('currentBoard');
    return boardId ? parseInt(boardId) : null;
  }

  getRecentBoards(): { id: number; name: string; password: string }[] {
    const boards = localStorage.getItem('recentBoards');
    return boards ? JSON.parse(boards) : [];
  }

  updateRecentBoard(id: number, password: string): void {
    const recentBoards = JSON.parse(localStorage.getItem('recentBoards') || '[]');
    const recentBoardIndex = recentBoards.findIndex((board: { id: number }) => board.id === id);
    if (recentBoardIndex !== -1) {
      recentBoards[recentBoardIndex].password = password;
      localStorage.setItem('recentBoards', JSON.stringify(recentBoards));
    }
  }

  deleteRecentBoard(id: number): void {
    const recentBoards = JSON.parse(localStorage.getItem('recentBoards') || '[]');
    const updatedBoards = recentBoards.filter((board: { id: number }) => board.id !== id);
    localStorage.setItem('recentBoards', JSON.stringify(updatedBoards));
  }
}
