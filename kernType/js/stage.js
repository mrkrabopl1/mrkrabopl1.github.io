function Stage(selector){
  const el = dom.qs(selector);
  const gShadow = dom.createNS({el: "g"}, svgRoot)
  const g = dom.createNS({el: "g", class: "letters"}, svgRoot);
  const _self = this;
  var selectedIndex = false;
  var letters = [];
  var shadowLetters = [];

  const compareButton = dom.gid("compare");
  const nextButton = dom.gid("next");
  const scoreWidget = dom.gid("scoreWidget");
  const tryAgainButton = dom.qs("a", scoreWidget);
  compareButton.addEventListener("click", function(){state.set("stageComparing", true)});
  nextButton.addEventListener("click", game.nextStage);
  tryAgainButton.addEventListener("click", tryAgain);


  function renderLetters(data) {
    _self.letters.forEach(letter => letter.remove());
    const word = data.word.split("");
    _self.letters = word.map((d, i) => {
      return new Letter(data.letters[d], data.start[i]);
    }); 

    _self.letters.forEach(letter => {
      g.appendChild(letter.g);
    });

    reposition();
  }

  function tryAgain(){
    game.loadStage(state.get("stageIndex"));
  }

  function renderShadow() {
    const data = getStage();
    shadowLetters.forEach(letter => letter.remove());
    // locked = true
    shadowLetters = data.word.split("").map((d, i) => new Letter(data.letters[d], data.start[i], true));
    shadowLetters.forEach(letter => {
      letter.toggleVisibility(false);
      gShadow.appendChild(letter.g);
    })
  }

  function load(data) {
    el.classList.remove("comparing");
    renderShadow(data);
    renderLetters(data);
    const rs = renderScene.bind(_self);
    rs(data);
    table.render(data);
    radio.hide();
    nextButton.classList.add("hidden");
    compareButton.classList.remove("hidden");
    scoreWidget.classList.add("hidden");
  }

  function renderScene(data){
    if (!data.scene) return;
    else data.scene(this);
  }

  function selectNext() {
    if (!_self.letters.length) return;
    _self.letters.forEach(letter => letter.deselect());
    if (_self.selectedIndex === false) {
      _self.selectedIndex = 0;
    }
    else {
      _self.selectedIndex += 1;
      if (_self.selectedIndex >= _self.letters.length) _self.selectedIndex = 0;
    }

    const selectedLetter = _self.letters[_self.selectedIndex];
    selectedLetter.select();
    if (selectedLetter.isLocked)
      selectNext();
    else
      selectedLetter.select();
      
  }

  function selectPrev() {
    if (!_self.letters.length) return;
    _self.letters.forEach(letter => letter.deselect());
    if (_self.selectedIndex === false) {
      _self.selectedIndex = _self.letters.length-1;
    }
     else {
      _self.selectedIndex -= 1;
      if (_self.selectedIndex < 0) _self.selectedIndex = _self.letters.length-1;
    }
     const selectedLetter = _self.letters[_self.selectedIndex];
     selectedLetter.select();
    if (selectedLetter.isLocked)
      selectPrev();
    else
      selectedLetter.select();
  }

  function nudgeSelected(amount) {
    if (_self.selectedIndex === false) return;
    _self.letters[_self.selectedIndex].nudge(amount);
    reposition(); 
  }

  function getStage(){
    const index = state.get("stageIndex");
    const stage = stages[index];
    return stage;
  }

  function play(){
    el.classList.remove("comparing");
  }

  function compare(){
    const stage = getStage();
    // reposition all letters so they lie at zero
    const letters = _self.letters;
    const offsetStart = letters[0].getOffset();
    const offsetEnd = letters[letters.length-1].getOffset();
    const scale = g.getBBox().width / gShadow.getBBox().width;
    radio.select(0);

    _self.letters.forEach((letter, i) => {
      letter.lock();
      letter.position = letter.getOffset();
      shadowLetters[i].moveTo(letter.position);
      shadowLetters[i].lock();
      letter.deselect();
    });

    table.hide();
    radio.show();
    el.classList.add("comparing");
    nextButton.classList.remove("hidden");
    compareButton.classList.add("hidden");
    scoreWidget.classList.remove("hidden");
    score();
    compareBoth();
  }

  function score(){
    const stage = getStage();
    const letters = _self.letters;
    const currentPositions = _self.letters.map(letter => letter.position);
    const difference = currentPositions
      .map((position, i) => {
        const value = stage.solution[i] - position;
        return utils.scale(value);
      })
      .reduce((a, b) => Math.abs(a) + Math.abs(b));

    
    const score = difference > letters.length ? Math.max(0, 5*(20 - difference/letters.length-2)) : 100;
    const scores = state.get("stageScore").filter(score => score && score > 1);
    scores[stage.index] = score;
    state.set("stageScore", scores);
    const scoreEl = dom.gid("score");
    //scoreEl.textContent = 100;
    anime({
      targets: scoreEl,
      duration: 1000,
      round: 1,
      innerHTML: [0, score],
      easing: "cubicBezier(0.000, .800, 0.485, .800)",
    })
  }

  function compareBoth(){
    const stage = getStage();
    
    _self.letters.forEach(letter => {
      letter.slide(letter.position);
    });

    shadowLetters.forEach((letter, i) => {
        letter.select();
        letter.moveTo(_self.letters[i].position);
        letter.toggleVisibility(true);
        letter.slide(stage.solution[i]);
      }
    );
  }

  function compareSolution(){
    const stage = getStage();
    
    shadowLetters.forEach(letter => {
      letter.fadeOut();
    })

    _self.letters.forEach((letter, i) => {
        letter.deselect();
        letter.slide(stage.solution[i]);
      }
    );
  }

  function compareYour(){
    const stage = getStage();

    shadowLetters.forEach(letter => {
      letter.fadeOut();
    })

    _self.letters.forEach((letter, i) => {
        letter.deselect();
        letter.slide(letter.position);
      }
    );
  }

  function getPositions(){
    return _self.letters.map(letter => letter.getOffset());
  }

  function getPositionsPct(){
    
  }


  function reposition(dx){

    const wordBBox = g.getBBox();

    const coords = _self.letters
      .map((letter, i) => {
        const rect = dom.qs(".dragarea", letter.g);
        //rect.setAttribute("fill", `hsla(${30 * i}deg, 100%, 50%, 0.3)`)
        //letter.path.style.fill = `hsla(${30 * i}deg, 100%, 50%, 1)`;
        const x = parseInt(rect.getAttribute("x"), 10);
        const w = parseInt(rect.getAttribute("width"));
        const x1 = x + letter.getOffset();
        const x2 = x1 + w;
        return [x1, x2];
      });

    const gaps = coords
      .map((coord, i) => {
        const leftGap = !i ? 0 : (coord[0] - coords[i-1][1])/2;
        const rightGap = i >= coords.length -1 ? 0 : (coords[i+1][0] - coord[1])/2;
        return [-leftGap, rightGap]
      })
      .forEach((gap, i) => {
        coords[i][0] += gap[0];
        coords[i][1] += gap[1];
        coords[i][1] -= coords[i][0]; // pure width
      });


    _self.letters.forEach((letter, i) => {
      const rect = dom.qs("rect", letter.g);
//      rect.setAttribute("fill", `hsla(${30 * i}deg, 100%, 50%, 0.3)`)
      rect.setAttribute("x", coords[i][0]-letter.getOffset())
      rect.setAttribute("width", Math.max(coords[i][1], 30));
      rect.setAttribute("y", wordBBox.y)
      rect.setAttribute("height", wordBBox.height);

      const bbox = letter.path.getBBox();
      const prevLetter =  _self.letters[i-1];
      const nextLetter =  _self.letters[i+1];
      const bboxPrev = prevLetter ? prevLetter.path.getBBox() : false;
      const bboxNext = _self.letters[i+1] ? nextLetter.path.getBBox() : false;
      const maxOffset = letter.path.getBBox().width/2;
    });

    const stage = getStage();

    const gBBox = _self.g.getBBox();
    
    const width = gBBox.width;
    const height = Math.max(...stage.lines) - Math.min(...stage.lines);

    var viewBox = {};
    viewBox.x = -window.innerWidth/20;
    viewBox.y = 0;
    viewBox.width = width+window.innerWidth/10;
    viewBox.height = height;
    _self.width = width;
    _self.height = height;

    const zoom = viewBox.width / window.innerWidth;

    svgRoot.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`)

  }


  this.load = load;
  this.getPositions = getPositions;
  this.selectNext = selectNext;
  this.selectPrev = selectPrev;
  this.nudgeSelected = nudgeSelected;
  this.compare = compare;
  this.play = play;
  this.compareSolution = compareSolution;
  this.compareYour = compareYour;
  this.compareBoth = compareBoth;
  this.letters = letters;
  this.selectedIndex = false;
  this.reposition = reposition;
  this.tryAgain = tryAgain;
  this.g = g;

}