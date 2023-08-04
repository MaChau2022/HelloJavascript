before(function() {
    console.log("  Use hook before")
    /** set global */
    global.name = 'iduck';
})

after(function() {
    console.log("  Use hook after")
})
