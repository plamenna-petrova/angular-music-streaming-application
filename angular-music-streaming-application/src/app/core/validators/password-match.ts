import { AbstractControl } from "@angular/forms";

export const comparePasswords = (matchingPasswordsGroup: AbstractControl) =>  {
    return matchingPasswordsGroup.get('password')!.value === 
        matchingPasswordsGroup.get('passwordConfirm')!.value
            ? null 
            : { 'mismatch': true };
}