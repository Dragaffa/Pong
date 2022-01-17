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
        this.load.image('balle', 'assets/cercle.png');
    }


    create(){


        this.hauteur = 500
        this.largeur = 1000

        this.haut = this.physics.add.sprite(0, -20, 'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur, 'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        this.gauche = this.physics.add.sprite(10, this.hauteur/2-50, 'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droit=this.physics.add.sprite(this.largeur-30,this.hauteur/2-50, 'carre').setOrigin(0,0);
        this.droit.setDisplaySize(20,100);
        this.droit.body.setAllowGravity(false);
        this.droit.setImmovable(true);

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'balle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.5,1.5);
        //this.balle.setVelocityY(Phaser.Math.Between(0, 0));
        this.balle.body.setMaxVelocityX(500)
        this.balle.body.setMaxVelocityY(100)
        this.Initiale();

        let me = this ;
        this.physics.add.collider(this.balle, this.droit,function(){
            console.log("touche droit")
            me.rebond(me.droit);
        } );
        this.physics.add.collider(this.balle, this.gauche,function(){
            me.rebond(me.gauche);
        });

        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.bas);


        this.initKeyboard();
    }

    Initiale (){
        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);

        this.gauche.setX(10);
        this.gauche.setY(this.hauteur/2-50);

        this.droit.setX(this.largeur-30);
        this.droit.setY(this.hauteur/2-50);

        let pourcent = Phaser.Math.Between(0, 100)

        if (pourcent >= 50){
            this.balle.setVelocityX(200);
        }
        if (pourcent < 50){
            this.balle.setVelocityX(-200);
        }

        this.balle.setVelocityY(0);

    }

    rebond(raquette){
            let me=this;

            console.log(raquette.y)
            console.log(me.balle.y)
            console.log((me.balle.y)-(raquette.y))

            let hauteurRaquette=raquette.displayHeight;

            let positionRelativeRaquette =(this.balle.y-raquette.y);

            positionRelativeRaquette =(positionRelativeRaquette/hauteurRaquette);

            positionRelativeRaquette= positionRelativeRaquette*2-1;
            console.log(positionRelativeRaquette);

            this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }



    initKeyboard() {
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(-200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droit.setVelocityY(-200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droit.setVelocityY(200)
                    break;

            }

        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droit.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droit.setVelocityY(0)
                    break;
            }
        });
    }

    update(){

        if(this.balle.x > this.largeur){
            this.Initiale();
        }
        if(this.balle.x < 0){
            this.Initiale();
        }

        if(this.balle.y < 0){
            this.balle.y = 0
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }
    }


}
