import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionReference,DocumentData, addDoc,collection, deleteDoc,doc,updateDoc,} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})

export class StartScreenComponent {
 game:Game;
  private gameCollection:CollectionReference<DocumentData>;
  constructor(private router: Router,private firestore: Firestore) {
this.gameCollection=collection(this.firestore,'games');
  }
  ngOnInit(): void {
   // this.newGame();
  }



  async newGame() {
    // Start Game
    this.game = new Game();
   let gameID= await addDoc(this.gameCollection,{game:this.game.toJSON()} );
   this.router.navigateByUrl(`/game/${gameID.id}`);
   console.log('ID',gameID.id);
  }
}
