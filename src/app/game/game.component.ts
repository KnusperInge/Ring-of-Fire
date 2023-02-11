import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { async, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CollectionReference,DocumentData, addDoc,collection, deleteDoc,doc,updateDoc, setDoc,onSnapshot} from '@firebase/firestore';
import { Firestore, collectionData, docData, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  cardStack = [0, 1, 2, 3];
 public game:Game={}as Game;
  currentGameID:string='';
  constructor(public dialog: MatDialog, private route: ActivatedRoute,private firestore: Firestore) { }

  ngOnInit(): void { 
    this.getID();
    this.getCurrentGame();  
  
      }

 getCurrentGame(){
  const unsub = onSnapshot( doc(this.firestore, "games", `${this.currentGameID}`), (doc) => {
   const gameObj=  doc.data();
   this.game=gameObj['game'];
  console.log("Current data: ", this.game);  

});
  }

 getID(){ 
  this.route.params.subscribe((params)=>{
  this.currentGameID=params['id'];

    });
  }

async updateGame(){
await setDoc(doc(this.firestore,'games',`${this.currentGameID}`),{
 game:this.game});
   }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length>0) {
      this.game.currentCard = this.game.stack.pop(); // pop picks last Element off Arr
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
        this.updateGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
       
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
}
