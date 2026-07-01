import { Component, computed, inject, signal, ViewChild, OnDestroy } from '@angular/core';
import { Spots } from '../../core/services/spots';
import { AddSpotModal } from '../../shared/components/add-spot-modal/add-spot-modal';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { LucideAngularModule, LogOut, Trash2, MapPin, Pencil, Sun, Moon, Copy, Check, X } from 'lucide-angular';
import { Rating } from '../../core/services/rating';
import { FormsModule } from "@angular/forms";
import { Spot } from '../../core/models/spot.model';
import { ThemeService } from '../../core/services/theme';
import { Boards } from '../../core/services/boards';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ERRORS } from '../../core/constants/errors';

@Component({
  selector: 'app-board',
  imports: [AddSpotModal, LucideAngularModule, FormsModule, ToastComponent],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnDestroy {

  spots = inject(Spots);
  router = inject(Router);
  auth = inject(Auth);
  rating = inject(Rating);
  themeService = inject(ThemeService);
  boards = inject(Boards);
  activatedRoute = inject(ActivatedRoute);
  board = signal<any>(null);

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

 
  showSpotModal = false;
  spotToEdit?: Spot;
  expandedSpotId?: string;
  deletePopoverId?: string;
  nota: number | null = null;

  // Estado para editar contraseña
  isEditingPassword = false;
  editingPassword = '';

  readonly LogOut = LogOut;
  readonly Trash2 = Trash2;
  readonly MapPin = MapPin;
  readonly Pencil = Pencil;
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly X = X;

  visitedSpot = computed(() => this.spots.spots().filter(spot => spot.visited));
  pendingSpot = computed(() => this.spots.spots().filter(spot => !spot.visited));

  nickname = this.auth.getNickname() || '';

  constructor() {
    const boardId = this.activatedRoute.snapshot.params['id'];
    this.spots.init(boardId);
    this.boards.getBoardById(boardId).then((board: any) => {
      this.board.set(board);
    });
  }

  ngOnDestroy() {
    this.spots.cleanup();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  averageRating(spotId: string) {
    const ratings = this.rating.ratings();
    const spotRatings = ratings.filter(rating => rating.spot_id === spotId)
    if (spotRatings.length === 0) {
      return 0;
    }
    const total = spotRatings.reduce((sum, rating) => sum + rating.score, 0);
    return Math.round((total / spotRatings.length) * 100) / 100;
  }

  noteTheme(score: number): string {
    const isDark = this.themeService.isDarkMode();
    if (score === 0) return isDark ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-100';
    if (score <= 4) return isDark ? 'bg-gradient-to-r from-red-700 to-red-800' : 'bg-gradient-to-r from-red-50 to-red-100';
    if (score <= 7) return isDark ? 'bg-gradient-to-r from-yellow-700 to-yellow-800' : 'bg-gradient-to-r from-yellow-50 to-yellow-100';
    return isDark ? 'bg-gradient-to-r from-green-700 to-green-800' : 'bg-gradient-to-r from-green-50 to-green-100';
  }

  ratingTheme(spotId: string): { cardBg: string, cardBorder: string, headerHover: string, expandedBorder: string, noteBg: string, buttonBg: string, scoreText: string } {
    const avg = this.averageRating(spotId);
    const isDark = this.themeService.isDarkMode();

    if (avg === 0) return {
      cardBg: isDark ? 'bg-gray-700' : 'bg-gray-100',
      cardBorder: isDark ? 'border-gray-600' : 'border-gray-200',
      headerHover: isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100',
      expandedBorder: isDark ? 'border-gray-600' : 'border-gray-200',
      noteBg: isDark ? 'bg-gray-600' : 'bg-gray-100',
      buttonBg: 'bg-gray-500 hover:bg-gray-600',
      scoreText: isDark ? 'text-gray-300' : 'text-gray-500'
    };
    if (avg <= 4) return {
      cardBg: isDark ? 'bg-red-800' : 'bg-red-100',
      cardBorder: isDark ? 'border-red-600' : 'border-red-100',
      headerHover: isDark ? 'hover:bg-red-700' : 'hover:bg-red-100',
      expandedBorder: isDark ? 'border-red-600' : 'border-red-200',
      noteBg: isDark ? 'bg-red-700' : 'bg-red-50',
      buttonBg: 'bg-red-500 hover:bg-red-600',
      scoreText: isDark ? 'text-red-300' : 'text-red-600'
    };
    if (avg <= 7) return {
      cardBg: isDark ? 'bg-yellow-800' : 'bg-yellow-100',
      cardBorder: isDark ? 'border-yellow-600' : 'border-yellow-100',
      headerHover: isDark ? 'hover:bg-yellow-700' : 'hover:bg-yellow-100',
      expandedBorder: isDark ? 'border-yellow-600' : 'border-yellow-200',
      noteBg: isDark ? 'bg-yellow-700' : 'bg-yellow-50',
      buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
      scoreText: isDark ? 'text-yellow-300' : 'text-yellow-600'
    };
    return {
      cardBg: isDark ? 'bg-green-800' : 'bg-green-100',
      cardBorder: isDark ? 'border-green-600' : 'border-green-100',
      headerHover: isDark ? 'hover:bg-green-700' : 'hover:bg-green-100',
      expandedBorder: isDark ? 'border-green-600' : 'border-green-200',
      noteBg: isDark ? 'bg-green-700' : 'bg-green-50',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      scoreText: isDark ? 'text-green-300' : 'text-green-700'
    };
  }

  editSpot(spot: Spot) {
    this.spotToEdit = spot;
    this.showSpotModal = true;
  }

  addRating(spotId: string) {
    const yaExiste = this.rating.ratings()
      .filter(r => r.spot_id === spotId)
      .some(r => r.nickname.toLowerCase() === this.nickname.toLowerCase());
    if (!yaExiste) {
      const notaValida = this.nota !== null && this.nota >= 0 && this.nota <= 10 && Math.round(this.nota * 10) === this.nota * 10;
      if (this.nickname.trim() === '' || !notaValida) {
        this.toastComponent.showToast(ERRORS.BOARD.RATING_INVALID, 'error');

      } else {

        this.rating.addRating(spotId, this.nickname, this.nota!);
        this.auth.nicknameStorage(this.nickname);

        this.nota = null;
        return;
      }
    } else {
      this.toastComponent.showToast(ERRORS.BOARD.RATING_EXISTS, 'warning');
    }
  }

  getBoardPassword() {
    const recentBoards = this.auth.getRecentBoards().find((b: any) => b.id === this.board()?.id);
    return recentBoards?.password || null;
  }

  copyPassword() {
    const password = this.getBoardPassword();
    if (password) {
      navigator.clipboard.writeText(password);
      this.toastComponent.showToast(ERRORS.BOARD.PASSWORD_COPIED, 'success');
    }
  }

  async saveNewPassword() {
    if (this.editingPassword.length >= 3) {
      await this.boards.updateBoard(this.board()?.id, this.board()?.name, this.editingPassword);
      this.auth.updateRecentBoard(this.board()?.id, this.editingPassword);
      this.editingPassword = '';
      this.isEditingPassword = false;
      this.board.set(await this.boards.getBoardById(this.board()?.id));
      this.toastComponent.showToast(ERRORS.BOARD.PASSWORD_UPDATED, 'success');
    } else {
      this.toastComponent.showToast(ERRORS.LOGIN.PASSWORD_LENGTH, 'error');
    }
  }



  startEditPassword() {
    this.isEditingPassword = true;
    this.editingPassword = '';
  }

  cancelEditPassword() {
    this.isEditingPassword = false;
    this.editingPassword = '';
  }


  //funcionalidad para desplegamble
  toggleSpot(id: string) {
    this.expandedSpotId = this.expandedSpotId === id ? undefined : id;
  }

  toggleDeletePopover(id: string) {
    this.deletePopoverId = this.deletePopoverId === id ? undefined : id;
  }

  async deleteSpotAndClose(id: string) {
    const success = await this.spots.deleteSpot(id);
    if (success) {
      this.deletePopoverId = undefined;
      this.expandedSpotId = undefined;
    }
  }

  async markVisitedAndClose(id: string) {
    const success = await this.spots.markVisited(id);
    if (success) {
      this.expandedSpotId = undefined;
    }
  }

}
