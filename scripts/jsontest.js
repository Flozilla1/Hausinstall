ProjektObjekt = {
    //Die einzelnen Instanzen müssen dringend folgende Namen haben, da ich durch sie entscheide, welche Html Struktur aufgebaut werden soll:
    //project-x, floor-x, room-x, device-x, sensor-x
    //Den Rest kann man besprechen, nur das erste ist schon a bissl eingefahren.
    //Und es können keine Mischlinge daher kommen, Projekte und Floors zb müssen getrennt gehen
	"project-1": {
		"titel": "Under the Bridge",
		"specification": {
			"baumeister": "Bob (der)",
			"kapital": "1.000c"
		}
	},
	"project-2": {
		"titel": "Todesstern",
		"specification": {
			"baumeister": "Darth Vader & the bloody emperor",
			"kapital": "100c"
		}
	},
	"project-3": {
		"titel": "Große Höhle",
		"specification": {
			"baumeister": "Ulog der Mammutschlächter",
			"kapital": "12 Steine"
		}
	},
	"project-4": {
		"titel": "Angband",
		"specification": {
			"baumeister": "Melkor aka Morgoth",
			"kapital": "∞"
		}
	},
	"project-5": {
		"titel": "Chopper",
		"specification": {
			"baumeister": "Arnold Schwarzenegger",
			"kapital": "50.000$"
		}
    }
}

FloorObjekt = {
	"floor-1": {
		"titel": "Kerker",
        "parent_id": "4",
		"specification": {
			"countFromBasement": "-32",
		}
	},
	"floor-2": {
		"titel": "Audienz-Ebene",
        "parent_id": "4",
		"specification": {
			"countFromBasement": "3",
		}
	},
	"floor-3": {
		"titel": "Hurin's 'schöne' Aussichtsplattform",
        "parent_id": "4",
		"specification": {
			"countFromBasement": "126",
		}
	},
	"floor-4": {
		"titel": "Brücke",
        "parent_id": "2",
		"specification": {
			"countFromBasement": "-32",
		}
	},
	"floor-5": {
		"titel": "Todesstrahler-Deck",
        "parent_id": "2",
		"specification": {
			"countFromBasement": "3",
		}
	},
	"floor-6": {
		"titel": "Todessturz-Schacht",
        "parent_id": "2",
		"specification": {
			"countFromBasement": "126",
		}
	}
}

RoomObjekt = {
	"room-1": {
		"titel": "Zelle #666",
        "parent_id": "1",
		"specification": {
			"Fläche": "1x1.5m",
		}
	},
	"room-2": {
		"titel": "Kontroll-Raum",
        "parent_id": "5",
		"specification": {
			"Fläche": "20x35m",
		}
	},
	"room-3": {
		"titel": "Thronraum",
        "parent_id": "2",
		"specification": {
			"Fläche": "126x56m",
		}
	}
}

DeviceObjekt = {
	"device-1": {
		"titel": "Elektro-Fackel",
        "parent_id": "3"
	},
	"device-2": {
		"titel": "Kontroll-Anlage",
        "parent_id": "2"
	},
	"device-3": {
		"titel": "Steckdose",
        "parent_id": "2"
	}
}
SensorObjekt = {
	"sensor-1": {
		"titel": "Hitze-Sensor",
        "parent_id": "1"
	},
	"sensor-2": {
		"titel": "Roter 'Hier schießen'-Knopf",
        "parent_id": "2"
	}
}