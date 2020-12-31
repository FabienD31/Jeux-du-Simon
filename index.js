const vm = new Vue({
  el: '#app',
  data: {
    //contient la séquence de carrés générés aléatoirement à chaque tour//
    sequence: [],
    //copie la séquence et la rejoue//
    tmp: [],
    //boolean des carrés pour afficher ou non la couleur//
    hautGauche: false,
    hautDroite: false,
    basGauche: false,
    basDroite: false,
    //tableau des carrés pour effectuer un random entre 0 et 3//
    squareMapping: ["hautGauche", "hautDroite", "basGauche", "basDroite"]
  },
  computed: {
    score() {
      let value = this.sequence.length - 1;
      return (value < 0) ? "score : " + 0 : `score : ${ value }`; //condition ternère : Si value < 0 return scrore:0 SINON return scrore + value
    }
  },
  methods: {
    //Math.floor() permet d'arrondir un nombre à son entier inférieur
    //Math.random() permet de choisir un nombre random entre 0 et 1 (exemple: 0,12323435)
    //la methode va ajouter un des 4 emplacements dans le tableau sequence//
    //la *4 permet de faire un math.random() sur des chiffres allant de 0 à 4 pour selectionner un des index du tableau squareMapping//
    addNewElementToSequence() {
      this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]),
      this.tmp = this.sequence.slice();
    },
    squareGrey(){
    this.hautGauche = false;
    this.hautDroite = false;
    this.basGauche = false;
    this.basDroite = false;
    },
    newGame() {
      //ATTENTION DE METTRE LA SEQUENCE DANS L'ORDRE//
      this.sequence = [];//remet le tableau à O//
      this.nextTurn();
    },
    nextTurn() {
      setTimeout(function () {
      vm.addNewElementToSequence(), 
      vm.squareGrey();
      vm.playSequence(vm.tmp[0]); 
      }, 800)
    },
    playSequence(carre) { 
      vm[carre] = true;
    setTimeout(function(){
      vm.squareGrey();
      vm.tmp.shift();//enleve l'index 0 qui vient d'etre coloré//
      //si le tableau sequence a au moins un élémént (if(vm.sequence[0]), alors la méthode va va récursivement s'appeler avec le nouveau carré situé à l'index 0 et ainsi de suite jusqu'à ce que tous les carrés de la sequence fut trouvé.//
      if(vm.tmp[0]){
        setTimeout(function(){
        vm.playSequence(vm.tmp[0]);
        }, 400);
      } 
      else {
        vm.tmp = vm.sequence.slice(); //sinon recopie la nouvelle sequence
      }
    }, 400)
  },
    selectSquare(carre) {
      if(carre === this.tmp[0]){
        this[carre] = true; //allume le carré du joueur si le choix est correct//
        setTimeout(function(){
          vm.squareGrey();//eteint le carré//
          vm.tmp.shift();//enlève le carré selectionner//
          if(!vm.tmp[0]){
            vm.nextTurn();//si tmp est vide, nous passons à la suite du jeu//
          }
        }, 100)
      } else {
        alert("Perdu !");
      }
    },  
  }
})