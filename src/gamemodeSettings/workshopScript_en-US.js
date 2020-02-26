// Custom game settings (lobby settings + workshop script) can only be imported 
// if their language matches the text language of the game.

// Only the English workshop script is needed, as OverPy can translate it to all other languages.
const baseWorkshopScript = `
variables
{
	global:
		0: notePositions
		1: pianoPosition
		2: bots
		3: speedPercent
		4: songPlaying
		5: chordArrayIndex
		6: defaultFacingDirection
		7: playerSpawn
		8: i
		9: minChordTime
		10: dataArrayIndex
		11: loopInfo
		12: loopStartIndex
		13: loopArrayIndex
		14: loopCounter
		19: songData
		20: tempArray

	player:
		0: readNote
		1: playNote
		2: currentPitch
		4: voiceIndex
}

subroutines
{
	0: checkLoop
	1: destroyBots
}

rule("By ScroogeD#5147 (Discord)")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Global init")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Set Global Variable(tempArray, Empty Array);
		Set Global Variable(minChordTime, 0.064);
		Set Global Variable(chordArrayIndex, 1);
		Set Global Variable(pianoPosition, Vector(-84.693, 13.873, -107.681));
		Set Global Variable(playerSpawn, Vector(-85.624, 14.349, -104.397));
		Set Global Variable(bots, Empty Array);
		Set Global Variable(speedPercent, 100);
		Set Global Variable(defaultFacingDirection, Vector(162, 60, 0));
		Disable Inspector Recording;
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("Speed: {0}%", Global Variable(speedPercent), Null, Null), Right,
			0, White, White, White, Visible To and String, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String(
			"Host player: Press Interact to start and stop the song, and Primary or Secondary Fire to change speed", Null, Null, Null),
			Top, 0, White, White, White, Visible To and String, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Custom String("By ScroogeD#5147 (Discord)", Null, Null, Null), Null, Left, 0, White,
			Yellow, White, Visible To and String, Default Visibility);
	}
}

rule("Note positions array init")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Set Global Variable(notePositions, Empty Array);
		Modify Global Variable(notePositions, Append To Array, Vector(0, -116.543, 59.952));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -121.295, 60.051));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -115.790, 61.716));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -120.998, 61.183));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -116.878, 62.765));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -117.911, 63.995));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -122.525, 64.050));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -118.207, 65.341));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -122.822, 65.457));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -120.031, 66.605));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -124.860, 66.649));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -119.196, 67.972));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -120.685, 69.576));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -126.365, 69.697));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -121.575, 71.104));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -128.227, 70.983));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -122.997, 72.427));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -123.453, 73.932));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -131.473, 73.872));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -126.107, 75.558));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -135.549, 75.157));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -127.969, 77.141));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -138.702, 76.805));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -131.375, 78.624));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -132.720, 80.250));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -148.760, 79.118));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -141.235, 81.398));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -153.270, 80.645));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -146.063, 82.963));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -156.440, 84.012));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -173.309, 82.469));
		Modify Global Variable(notePositions, Append To Array, Vector(0, -171.172, 85.419));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 175.303, 82.820));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 172.277, 85.891));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 161.444, 83.177));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 150.139, 85.457));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 133.011, 84.309));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 133.171, 82.408));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 119.388, 83.771));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 123.272, 81.315));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 107.710, 82.386));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 105.095, 80.563));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 108.935, 79.118));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 96.301, 79.557));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 104.601, 77.498));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 93.334, 78.168));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 99.926, 76.267));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 91.154, 76.882));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 91.390, 74.943));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 96.026, 73.301));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 86.204, 73.812));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 93.054, 72.010));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 84.128, 72.191));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 85.095, 70.527));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 91.533, 69.060));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 82.996, 69.181));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 87.808, 67.813));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 82.106, 67.736));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 87.275, 66.231));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 81.513, 66.132));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 80.958, 64.984));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 85.413, 63.776));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 80.184, 63.594));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 84.979, 62.628));
		Modify Global Variable(notePositions, Append To Array, Vector(0, 79.689, 62.249));
	}
}

rule("Player init")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Dummy Bot(Event Player) != True;
		Has Spawned(Event Player) == True;
		Is Alive(Event Player) == True;
	}

	actions
	{
		Set Status(Event Player, Null, Phased Out, 9999);
		Wait(1, Ignore Condition);
		Teleport(Event Player, Global Variable(playerSpawn));
		Set Damage Received(Event Player, Absolute Value(9999999.000));
	}
}

rule("Dummy init")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Dummy Bot(Event Player) == True;
	}

	actions
	{
		Set Status(Event Player, Null, Phased Out, 9999);
		Set Damage Dealt(Event Player, Absolute Value(9999999.000));
		Set Invisible(Event Player, All);
		Teleport(Event Player, Global Variable(pianoPosition));
	}
}

rule("Primary fire: increase speed")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player == Host Player;
		Is Button Held(Event Player, Primary Fire) == True;
	}

	actions
	{
		Modify Global Variable(speedPercent, Add, 5);
	}
}

rule("Secondary fire: decrease speed")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player == Host Player;
		Is Button Held(Event Player, Secondary Fire) == True;
	}

	actions
	{
		Modify Global Variable(speedPercent, Subtract, 5);
	}
}

rule("Interact: create dummy bots, start playing")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player == Host Player;
		Is Button Held(Event Player, Interact) == True;
		Global Variable(songPlaying) == 0;
	}

	actions
	{
		Set Global Variable(songPlaying, 1);
		Set Global Variable(i, 11);
		While(And(Compare(Count Of(Global Variable(bots)), <, First Of(First Of(Global Variable(songData)))), Compare(Global Variable(i),
			>, 0)));
			If(Not(Entity Exists(Players In Slot(Global Variable(i), All Teams))));
				Create Dummy Bot(Hero(Symmetra), All Teams, Global Variable(i), Global Variable(pianoPosition), Vector(0, 0, 0));
				Modify Global Variable(bots, Append To Array, Last Created Entity);
			End;
			Modify Global Variable(i, Subtract, 1);
			Wait(0.016, Ignore Condition);
		End;
		Set Global Variable(i, 0);
		For Global Variable(i, 0, Count Of(Global Variable(bots)), 1);
			Set Player Variable(Value In Array(Global Variable(bots), Global Variable(i)), voiceIndex, Global Variable(i));
		End;
		Set Global Variable(i, 0);
		Wait(2.500, Ignore Condition);
		Set Global Variable(songPlaying, 2);
	}
}

rule("Interact: stop playing")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player == Host Player;
		Is Button Held(Event Player, Interact) == True;
		Global Variable(songPlaying) == 2;
	}

	actions
	{
		Set Global Variable(bots, Empty Array);
		Call Subroutine(destroyBots);
		Set Global Variable(dataArrayIndex, 0);
		Wait(1, Ignore Condition);
		Set Global Variable(songPlaying, 0);
		Set Global Variable(chordArrayIndex, 1);
	}
}

rule("Play piano")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Global Variable(songPlaying) == 2;
	}

	actions
	{
		While(And(Compare(Global Variable(dataArrayIndex), <, Count Of(Global Variable(songData))), Global Variable(songPlaying)));
			If(Compare(Add(Global Variable(chordArrayIndex), Y Component Of(Value In Array(Value In Array(Global Variable(songData),
				Global Variable(dataArrayIndex)), Global Variable(chordArrayIndex)))), >, Count Of(Value In Array(Global Variable(songData),
				Global Variable(dataArrayIndex)))));
				Modify Global Variable(dataArrayIndex, Add, 1);
				Set Global Variable(chordArrayIndex, 0);
			End;
			Set Player Variable(Global Variable(bots), readNote, True);
			Wait(Max(Divide(Global Variable(minChordTime), 2), Subtract(Divide(X Component Of(Value In Array(Value In Array(Global Variable(
				songData), Global Variable(dataArrayIndex)), Global Variable(chordArrayIndex))), Divide(Global Variable(speedPercent), 100)),
				Divide(Global Variable(minChordTime), 2))), Ignore Condition);
			Set Player Variable(Global Variable(bots), playNote, True);
			Wait(Divide(Global Variable(minChordTime), 2), Ignore Condition);
			If(Compare(Z Component Of(Value In Array(Value In Array(Global Variable(songData), Global Variable(dataArrayIndex)),
				Global Variable(chordArrayIndex))), !=, 0));
				Call Subroutine(checkLoop);
			End;
			Modify Global Variable(chordArrayIndex, Add, Add(Y Component Of(Value In Array(Value In Array(Global Variable(songData),
				Global Variable(dataArrayIndex)), Global Variable(chordArrayIndex))), 1));
		End;
		Set Global Variable(songPlaying, 0);
		Set Global Variable(chordArrayIndex, 1);
		Set Global Variable(dataArrayIndex, 0);
		Call Subroutine(destroyBots);
		Set Global Variable(bots, Empty Array);
	}
}

rule("Handle loops")
{
	event
	{
		Subroutine;
		checkLoop;
	}

	actions
	{
		Set Global Variable(loopInfo, Z Component Of(Value In Array(Value In Array(Global Variable(songData), Global Variable(
			dataArrayIndex)), Global Variable(chordArrayIndex))));
		If(Compare(Global Variable(loopInfo), ==, 2));
			Set Global Variable(loopStartIndex, Global Variable(chordArrayIndex));
			Set Global Variable(loopArrayIndex, Global Variable(dataArrayIndex));
		Else If(And(Compare(Global Variable(loopInfo), ==, 3), Not(Global Variable(loopCounter))));
			Set Global Variable(chordArrayIndex, Global Variable(loopStartIndex));
			Set Global Variable(dataArrayIndex, Global Variable(loopArrayIndex));
			Modify Global Variable(loopCounter, Add, 1);
		Else If(Compare(Global Variable(loopInfo), ==, 4));
			Set Global Variable(chordArrayIndex, Global Variable(loopStartIndex));
			Set Global Variable(dataArrayIndex, Global Variable(loopArrayIndex));
		Else;
			Set Global Variable(loopCounter, 0);
		End;
	}
}

rule("Read note")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Player Variable(Event Player, readNote) == True;
	}

	actions
	{
		Set Player Variable(Event Player, readNote, False);
		If(Not(Compare(Player Variable(Event Player, voiceIndex), >, Add(Y Component Of(Value In Array(Value In Array(Global Variable(
			songData), Global Variable(dataArrayIndex)), Global Variable(chordArrayIndex))), -1.000))));
			Set Player Variable(Event Player, currentPitch, Value In Array(Value In Array(Global Variable(songData), Global Variable(
				dataArrayIndex)), Add(Add(Global Variable(chordArrayIndex), Player Variable(Event Player, voiceIndex)), 1)));
			Set Facing(Event Player, Direction From Angles(Y Component Of(Value In Array(Global Variable(notePositions), Player Variable(
				Event Player, currentPitch))), Z Component Of(Value In Array(Global Variable(notePositions), Player Variable(Event Player,
				currentPitch)))), To World);
		End;
	}
}

rule("Play note")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Player Variable(Event Player, playNote) == True;
	}

	actions
	{
		If(Not(Compare(Player Variable(Event Player, voiceIndex), >, Add(Y Component Of(Value In Array(Value In Array(Global Variable(
			songData), Global Variable(dataArrayIndex)), Global Variable(chordArrayIndex))), -1.000))));
			Start Holding Button(Event Player, Primary Fire);
			Wait(Min(0.160, Divide(Global Variable(minChordTime), 2)), Ignore Condition);
			Stop Holding Button(Event Player, Primary Fire);
		End;
		Set Player Variable(Event Player, playNote, False);
	}
}

rule("Destroy bots (workaround for Destroy All Dummy Bots bug)")
{
	event
	{
		Subroutine;
		destroyBots;
	}

	actions
	{
		Set Global Variable(i, 0);
		For Global Variable(i, 0, 12, 1);
			Destroy Dummy Bot(All Teams, Global Variable(i));
		End;
		Set Global Variable(i, 0);
	}
}`;

// Used in case the user chooses to not generate the full gamemode settings.
const convertedMidiVars = `variables
{
    global:
        19: songData
        20: tempArray
}`;
