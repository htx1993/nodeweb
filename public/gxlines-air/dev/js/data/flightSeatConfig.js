var HNA_FLIGHT_SEAT_LAYER_GX = {
    "145|ERJ": {
        "columns": ["A", false, "D", "F"],
        "reserved": ["1A","3D","3F","12A","12D","12F"]
    },
    "190|ERJ": {
    	"columns": ["A", "C", false, "D", "F"],
    	"reserved": ["2D","2F","3C","3D","3F","13A","13C","13D","13F","27C"]
    },
    "191": {
    	"columns": ["A", "C", false, "D", "F"],
    	"reserved": ["2D","2F","3C","3D","3F","13A","13C","13D","13F","27C"]
    },
    "195": {
    	"columns": ["A", "C", false, "D", "F"],
    	"reserved": ["2D","2F","3C","3D","3F","14A","14C","14D","14F","31C"]
    },
    "E90": {
        "columns": ["A", "C", false, "D", "F"],
        "reserved": ["3A","3C","3D","3F","11A","11C","11D","11F","25C"]
    },
    "320": {
        "columns": ["A", "B",  "C",false, "D", "E", "F"],
        "reserved": ["3A","3B","3C","3D","3E","3F","10A","10B","10C","10D","10E","10F","11A","11B","11C","11D","11E","11F","27C"]
    },
    "32G": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C","1D","1E","1F","3C","3D","30C"]
    },
    "32I": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C","1D","1E","1F","3C","3D","12A","12B","12C","12D","12E","12F","13A","13B","13C","13D","13E","13F","30C"]
    },
    "32F": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A","1B","1C","1D","1E","1F","3C","3D","12A","12B","12C","12D","12E","12F","13A","13B","13C","13D","13E","13F","29C"]
    },
    "32T": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["3A","3B","3C","3D","3E","3F","10A","10B","10C","10D","10E","10F","11A","11B","11C","11D","11E","11F","27C"]
    },
    "32K": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A","1B","1C","1D","1E","1F","3C","3D","12A","12B","12C","12D","12E","12F","13A","13B","13C","13D","13E","13F","29C"]
    },
    "332": {
        "columns": ["A", "C", false, "D", "E", "F", "G", false, "H", "K"],
        "reserved": ["11A","11C","11D","11G","31A","31C","31D","31E","31F","31G","31H","31K","48A","48C","48D","48E","48F","48G","48H","48K","61C"]
    }
};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.getCity = function(){
            return HNA_FLIGHT_SEAT_LAYER_GX;
        };
    }
}