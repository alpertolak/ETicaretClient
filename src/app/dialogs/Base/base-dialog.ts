import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<BaseCompenent> {

    constructor(public dialogRef: MatDialogRef<BaseCompenent>){
        
    }

    Close(){
        this.dialogRef.close()
    }
} 
