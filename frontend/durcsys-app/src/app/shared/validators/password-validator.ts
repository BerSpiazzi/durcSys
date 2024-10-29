import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const hasNumber = /[0-9]/.test(value);
        const hasLetter = /[a-zA-Z]/.test(value);

        const passwordValid = hasNumber && hasLetter;
        return !passwordValid ? {passwordStrength: true} : null;
    };
}