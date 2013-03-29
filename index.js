module.exports = {
  overlay: function(val) {
    return function(x, y, z, n, game) {
      var above = [x, y + 1, z]
      if (game.getBlock(x, y, z) !== 0 && 
          game.getBlock(above) === 0) game.setBlock(above, val)
    }
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