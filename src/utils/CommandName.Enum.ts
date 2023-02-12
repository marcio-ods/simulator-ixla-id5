export enum CMDName {
	Reset = 'reset',
	Loaddocument = 'loaddocument',
	Updatedocument = 'updatedocument',
	Marklayout = 'marklayout',
	Autoposition = 'autoposition',
	Connect2chip = 'connect2chip',
	Transmit2chip = 'transmit2chip',
	Connect2rfid = 'connect2rfid',
	Transmit2rfid = 'transmit2rfid',
	Getimage = 'getimage',
	Movecard = 'movecard',
	Interfacestatus = 'interfacestatus',
	Moveflip = 'moveflip',
	MoveToChip = 'movetochip',
	MoveToEncoder = 'movetoencoder',
	MoveToFlipover = 'movetoflipover',
	MoveToLaser = 'movetolaser',
	MoveToEject = 'movetoeject',
	MoveToReject = 'movetoreject',
	MoveToCli = 'movetocli',
	MoveToMagnetic = 'movetomagnetic',
	//status do transporte Ready | Transporting | Jam <command valid="true" transportstatus="TransportStatus" >
}

// <command name="connect2chip" />
// <command valid="true" ATR="[ATR]" />

// <command name="transmit2chip" APDU="[APDU]" />
// <command valid="true" ChipReply="[String]" />

// <command name="connect2rfid" />
// <command valid="true" ATR="[ATR]" />
// <command name="transmit2rfid" APDU="[APDU]" />
// <command valid="true" ChipReply="[String]" />

// <command name="getimage" Homography="[Boolean]" />
// <command valid="true" Image="[CODE64 String]" />

// Transportstatus = "transportstatus",
// Check the machine status

// => <command name="machinestatus" />

// <= <command valid="true" transportstatus="Ready" laserstatus="Ready" interfacestatus="Ready" >
