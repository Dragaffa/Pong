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
        this.load.image('balle', 'assets/meteorite.png');

        this.load.image('fire', 'assets/muzzleflash3.png');

        this.load.image('fond', 'assets/fond3.jpg');

        this.load.image('trou', 'assets/trounoir.png');
    }


    create(){

        this.hauteur = 500
        this.largeur = 1000

        this.fond = this.add.image(0,0,"fond").setOrigin(0,0);

        this.particles = this.add.particles('trou');



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

        this.tweens.add({
            targets:[this.balle],
            rotation: 6.5,
            ease :'Repeat',
            repeat:1000000,
            duration:1000,
        })

        this.creationtrounoir();

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

        //this.particles = this.add.particles('fire');

        /*this.particles.createEmitter({
            speed: 100,
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD',
            follow:this.balle,
            lifespan: 600,
            angle: this.balle.x+40,

        });*/


        this.joueurGauche = new Joueur('Player 1','joueurGauche')
        this.joueurDroite = new Joueur('Player 2','joueurDroite')
        console.log(this.joueurGauche)

        this.initKeyboard();
    }

    creationtrounoir(){
        let me = this;
        let trou;
        this.obstacles=[];


        for(let i=0;i<3;i++){
                        
            trou = this.physics.add.sprite(
                Phaser.Math.Between(200, this.largeur-200),
                Phaser.Math.Between(50, this.hauteur-50),
                'balle');
            trou.setDisplaySize(50,50);
            trou.body.setAllowGravity(false);
            trou.setImmovable(true);

            this.tweens.add({
                targets:[trou],
                rotation: 6.5,
                ease :'Repeat',
                repeat:-1,
                duration:10000,
            })

            this.obstacles.push(trou);

            this.physics.add.collider(this.balle, trou, function () {
                console.log("touche droitVert");
                //me.sound.play('vertSound');
                me.obstacles[i].setVisible(false);
                me.obstacles[i].destroy();
                me.particles.createEmitter({
                    scale: { start: 0.05, end: 0.1},
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: 20,
                    blendMode: 'ADD',
                    frequency: 100,
                    maxParticles: 6,
                    x: me.obstacles[i].x,
                    y: me.obstacles[i].y
                });

            });

        }
    }

    /**disparait(obstacle) {

        obstacle.body.setEnable(false);
        obstacle.setVisible(false);

    }*/

    Initiale (){
        let me = this


        for(let i=0;i<me.obstacles.length;i++){
            me.obstacles[i].destroy();
        }

        this.creationtrounoir();


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



    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.Initiale();
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
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        if (me.gauche.y>0){
                            me.gauche.setVelocityY(-200)
                        }
                        else{
                            me.gauche.setY(0)
                            me.gauche.setVelocityY(0)
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.X:
                        if (me.gauche.y<400){
                            me.gauche.setVelocityY(200)
                        }
                        else{
                            me.gauche.setVelocityY(0)
                            me.gauche.setY(400)
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.J:
                        if (me.droit.y>0){
                            me.droit.setVelocityY(-200)
                        }
                        else{
                            me.droit.setY(0)
                            me.droit.setVelocityY(0)
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.N:
                        if (me.droit.y<400){
                            me.droit.setVelocityY(200)
                        }
                        else{
                            me.droit.setY(400)
                            me.droit.setVelocityY(0)

                        }
                        break;


                }
            });
            this.input.keyboard.on('keyup', function(kevent)
            {
                switch (kevent.keyCode)
                {
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        me.gauche.setVelocityY(0)
                        break
                    case Phaser.Input.Keyboard.KeyCodes.X:
                        me.gauche.setVelocityY(0)
                        break
                    case Phaser.Input.Keyboard.KeyCodes.J:
                        me.droit.setVelocityY(0)
                        break
                    case Phaser.Input.Keyboard.KeyCodes.N:
                        me.droit.setVelocityY(0)
                        break

                }
            });
        }

    update() {

        if (this.balle.x > this.largeur) {
            this.win(this.joueurGauche);
        }
        if (this.balle.x < 0) {
            this.win(this.joueurDroite);
        }

        if (this.balle.y < 0) {
            this.balle.y = 0
        }
        if (this.balle.y > this.hauteur) {
            this.balle.y = this.hauteur
        }


    }



}
