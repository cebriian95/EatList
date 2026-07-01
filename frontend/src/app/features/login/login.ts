import { Component, inject, ViewChild } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Boards } from '../../core/services/boards';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme';
import { LucideAngularModule, Sun, Moon, ArrowRight, Trash2, XIcon } from 'lucide-angular';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { Utils } from '../../core/services/utils';
import { ERRORS } from '../../core/constants/errors';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideAngularModule, ToastComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  auth = inject(Auth);
  boards = inject(Boards);
  router = inject(Router);
  themeService = inject(ThemeService);
  utils = inject(Utils);

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  errorMessage: string = '';

  // Propiedades para el nuevo login
  //unirse a board
  boardId: string = '';
  password: string = '';

  //crear board
  createBoardName: string = '';
  createBoardPassword: string = '';
  
  //boards recientes
  recentBoards = signal(this.auth.getRecentBoards());
  pendingBoard: any = null;
  newPassword: string = '';

  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly ArrowRight = ArrowRight;
  readonly Trash2 = Trash2;
  readonly XIcon = XIcon;

  async onLogin() {
    const sanitizedBoardId = this.utils.sanitizeId(this.boardId);
    const sanitizedPassword = this.utils.sanitizeInput(this.password);

    if (!this.boardId.trim()) {
      this.toastComponent.showToast(ERRORS.LOGIN.BOARD_ID_REQUIRED, 'error');
      return;
    }

    if (!sanitizedBoardId) {
      this.toastComponent.showToast(ERRORS.LOGIN.BOARD_ID_INVALID, 'error');
      return;
    }

    if (!sanitizedPassword) {
      this.toastComponent.showToast(ERRORS.LOGIN.PASSWORD_REQUIRED, 'error');
      return;
    }

    if (await this.auth.checkPassword(parseInt(sanitizedBoardId), sanitizedPassword)) {
      this.router.navigate(['/board', sanitizedBoardId]);
    } else {
      this.toastComponent.showToast(ERRORS.LOGIN.PASSWORD_INCORRECT, 'error');
    }
  }

  async onCreateBoard() {
    const sanitizedName = this.utils.sanitizeInput(this.createBoardName, 20);
    const sanitizedPassword = this.utils.sanitizeInput(this.createBoardPassword);

    if (sanitizedName.length < 3 || sanitizedName.length > 20) {
      this.toastComponent.showToast(ERRORS.LOGIN.NAME_LENGTH, 'error');
      return;
    }

    if (sanitizedPassword.length < 3) {
      this.toastComponent.showToast(ERRORS.LOGIN.PASSWORD_LENGTH, 'error');
      return;
    }

    const board = await this.boards.addBoard(sanitizedName, sanitizedPassword);
    if (board) {
      await this.auth.checkPassword(board.id, sanitizedPassword);
      this.router.navigate(['/board', board.id]);
    }

  }
  
  async onLoginWithBoard(board: any) {
    this.pendingBoard = board;
    this.newPassword = '';
    
    if (await this.auth.checkPassword(board.id, board.password)) {
      this.pendingBoard = null;
      this.router.navigate(['/board', board.id]);
    } else {
      this.toastComponent.showToast(ERRORS.LOGIN.PASSWORD_SAVED_INVALID, 'error');
    }
  }

  isPendingBoard(board: any): boolean {
    return this.pendingBoard?.id === board.id;
  }

  async onLoginWithNewPassword(board: any) {
    const sanitizedNewPassword = this.utils.sanitizeInput(this.newPassword);
    
    if (!sanitizedNewPassword) {
      this.toastComponent.showToast(ERRORS.LOGIN.NEW_PASSWORD_REQUIRED, 'error');
      return;
    }

    if (await this.auth.checkPassword(board.id, sanitizedNewPassword)) {
      this.pendingBoard = null;
      this.newPassword = '';
      this.router.navigate(['/board', board.id]);
    } else {
      this.toastComponent.showToast(ERRORS.LOGIN.NEW_PASSWORD_INCORRECT, 'error');
    }
  }

  cancelLoginWithNewPassword() {
    this.pendingBoard = null;
    this.newPassword = '';
  }
  
  // Control de vista actual
  currentView: 'login' | 'create' = 'login';

  // Cambiar entre vistas
  setView(view: 'login' | 'create') {
    this.currentView = view;
  }
  
}
