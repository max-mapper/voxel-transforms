var glMatrix = require('gl-matrix')
var vector = glMatrix.vec3

module.exports = {
  erase: function(x, y, z, game) {
    game.setBlock([x, y, z], 0)
  },
  overlay: function(val) {
    var buffer = []
    return function(x, y, z, game) {
      if (!x) return buffer.forEach(function(vec) { game.setBlock(vec, val) })
      var above = [x, y + 1, z]
      if (game.getBlock(x, y, z) !== 0 &&
          game.getBlock(above) === 0) buffer.push(above)
    }
  },
  move: function(game, low, high, shift, copyAir) {
    var buffer = []
    var minX = low[0]
    var minY = low[1]
    var minZ = low[2]
    var maxX = high[0]
    var maxY = high[1]
    var maxZ = high[2]
    
    var newMin = []
    var newMax = []
    vector.add(newMin, low, shift)
    vector.add(newMax, high, shift)

    for (var x = minX; x <= maxX; ++x) {
      for (var z = minZ; z <= maxZ; ++z) {
        for (var y = minY; y <= maxY; ++y) {
          var pos = [x, y, z]
          var block = game.getBlock(pos)

          if (!(block === 0) || copyAir) {
            var newPos = []
            vector.add(newPos, pos, shift)

            buffer.push([newPos, block])

            // Don't want to replace the old block if it's in
            // the new area
            if (   x >= newMin[0]
                && x <= newMax[0]
                && y >= newMin[1]
                && y <= newMax[1]
                && z >= newMin[2]
                && z <= newMax[2] ) {
                  
            } else {
              game.setBlock(pos, 0)
            }
          }
        }
      }
    }
    buffer.forEach(function(i) { game.setBlock(i[0], i[1]) })
  
  },
  walls: function(game, low, high, val) {
    var minX = low[0]
    var minY = low[1]
    var minZ = low[2]
    var maxX = high[0]
    var maxY = high[1]
    var maxZ = high[2]

    for (var x = minX; x <= maxX; ++x) {
      for (var y = minY; y <= maxY; ++y) {
        var minV = [x, y, minZ]
        var maxV = [x, y, maxZ]
        game.setBlock(minV, val)
        game.setBlock(maxV, val)
      }
    }

    for (var y = minY; y <= maxY; ++y) {
      for (var z = minZ; z <= maxZ; ++z) {
        var minV = [minX, y, z]
        var maxV = [maxX, y, z]
        game.setBlock(minV, val)
        game.setBlock(maxV, val)
      }
    }
  }
}