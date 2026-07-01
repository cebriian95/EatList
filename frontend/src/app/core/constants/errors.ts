export const ERRORS = {
  LOGIN: {
    BOARD_ID_REQUIRED: 'El campo ID es obligatorio.',
    BOARD_ID_INVALID: 'Ingrese un ID válido, solo números.',
    PASSWORD_REQUIRED: 'El campo contraseña es obligatoria.',
    PASSWORD_INCORRECT: 'Contraseña incorrecta o la sala no existe. Inténtalo de nuevo.',
    NAME_LENGTH: 'El nombre debe tener entre 3 y 20 caracteres.',
    PASSWORD_LENGTH: 'La contraseña debe tener al menos 3 caracteres.',
    PASSWORD_SAVED_INVALID: 'La contraseña guardada no es válida. Escribe la nueva.',
    NEW_PASSWORD_REQUIRED: 'La nueva contraseña es obligatoria.',
    NEW_PASSWORD_INCORRECT: 'Nueva contraseña incorrecta.',
  },
  BOARD: {
    RATING_INVALID: 'Introduce un nombre y una nota válida (0-10).',
    RATING_EXISTS: 'Ya has valorado este sitio.',
    PASSWORD_LENGTH: 'La contraseña debe tener al menos 3 caracteres.',
    PASSWORD_COPIED: 'Contraseña copiada al portapapeles.',
    PASSWORD_UPDATED: 'Contraseña actualizada.',
  },
  SPOT: {
    TITLE_REQUIRED: 'El campo restaurante es obligatorio.',
    LOCATION_REQUIRED: 'El campo ciudad es obligatorio.',
    URL_INVALID: 'El enlace debe ser de Google Maps (https://maps.app.goo.gl/...)',
  }
};
