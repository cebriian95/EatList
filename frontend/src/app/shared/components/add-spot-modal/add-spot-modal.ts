import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Spots } from '../../../core/services/spots';
import { FormsModule } from '@angular/forms';
import { Spot } from '../../../core/models/spot.model';
import { Utils } from '../../../core/services/utils';
import { ERRORS } from '../../../core/constants/errors';

@Component({
  selector: 'app-add-spot-modal',
  imports: [FormsModule],
  templateUrl: './add-spot-modal.html',
  styleUrl: './add-spot-modal.css',
})
export class AddSpotModal implements OnInit {

  spots = inject(Spots);
  utils = inject(Utils);

  @Input() spot?: Spot;
  @Input() boardId?: number;

  @Output() close = new EventEmitter();


  title = '';
  location = '';
  location_map = '';
  isVisited = false;

  titleError = '';
  locationError = '';
  location_mapError = '';

  createSpot() {
    const sanitizedTitle = this.utils.sanitizeInput(this.title);
    const sanitizedLocation = this.utils.sanitizeInput(this.location);
    const sanitizedUrl = this.location_map.trim() ? this.utils.sanitizeUrl(this.location_map) : '';

    if (!sanitizedTitle) {
      this.titleError = ERRORS.SPOT.TITLE_REQUIRED;
      return;
    }
    this.titleError = '';

    if (!sanitizedLocation) {
      this.locationError = ERRORS.SPOT.LOCATION_REQUIRED;
      return;
    }
    this.locationError = '';

    if (sanitizedUrl && !sanitizedUrl.startsWith('https://maps.app.goo.gl/')) {
      this.location_mapError = ERRORS.SPOT.URL_INVALID;
      return;
    }
    this.location_mapError = '';

    if (this.spot) {
      this.spots.updateSpot(this.spot.id, sanitizedTitle, sanitizedLocation, sanitizedUrl, this.isVisited);
    } else {
      this.spots.addSpot(sanitizedTitle, sanitizedLocation, sanitizedUrl, this.boardId?.toString() || '', this.isVisited);
    }
    this.close.emit();
  }

  ngOnInit() {
    if (this.spot) {
      this.title = this.spot.title;
      this.location = this.spot.location;
      this.location_map = this.spot.location_map;
      this.isVisited = this.spot.visited;
    }
  }

  cancel() {
    this.close.emit();
  }

}
