const composer = {};


composer.lines = function(lines){
  var viewBox = svgRoot.viewBox.baseVal || utils.viewBox;
  var scene = dom.qs("g.scene") || dom.createNS({el: "g", class: "scene"});
  dom.emptyNS(scene);

  lines
    .map((line, i) => {
      const padding = viewBox.width/2;
      return dom.createNS({
        el: "line",
        x1: viewBox.x-padding,
        x2: viewBox.width+padding,
        y1: line,
        y2: line
      }, scene);
    })
    .forEach((line, i) => {
      const startOrEnds = i===0 || i === lines.length-1;
      line.classList.toggle("baseline", startOrEnds);
    });

  svgRoot.insertBefore(scene, svgRoot.firstChild);

  return this;
}