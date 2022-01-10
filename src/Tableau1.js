/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
let timeline;
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre', 'assets/carre.png');
        this.load.image('ball', 'assets/cercle.png');
    }


    create(){

        this.hauteur=500
        this.largeur=1000

        this.ball=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'ball');
        this.ball.setDisplaySize(20,20);
        this.ball.body.setBounce(1.1,1.1);
        this.ball.setVelocityX(100);
        this.ball.setMaxVelocity(Phaser.Math.Between(200,-200));
        //this.ball.setMaxVelocity(1000,1000);

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur-20, 'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        this.physics.add.collider(this.ball,this.bas);
        this.physics.add.collider(this.ball,this.haut);
    }

    update(){
        if (this.ball.x > this.largeur){
            this.ball.x = 0
        }
        if (this.ball.y < 0){
            this.ball.y = 0
        }
        if (this.ball.y > this.hauteur){
            this.ball.y = this.hauteur
        }
    }


}
