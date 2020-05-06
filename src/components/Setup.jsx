import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import logo from '../images/carto-logo.svg';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { COLORS, SCREENS } from '../utils/constants';

const Setup = () => {
  // Global States
  const [, setScreen] = useGlobalState('screen');
  const [, setGame] = useGlobalState('game');
  // Local States
  const [mode, setMode] = useState('normal');
  const [addMonsters, setAddMonsters] = useState(true);
  const [addSkills, setAddSkills] = useState(false);
  const [addRiftLands, setAddRiftLands] = useState(false);

  const handleStartGame = () => {
    gameEngine.setup({
      mode,
      monsters: addMonsters,
      extraRiftLands: addRiftLands,
      skills: addSkills,
    });
    setGame(gameEngine.state);
    setScreen(SCREENS.GOALS);
  };

  return (
    <div className="setup">
      <img className="logo-small" src={logo} alt="Carto logo" />
      <h1>Setup</h1>
      <FormGroup>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ color: COLORS.PRIMARY }}>
            Mode
          </FormLabel>
          <RadioGroup
            aria-label="mode"
            name="mode"
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <FormControlLabel value="simple" control={<Radio />} label="Simple" />
            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ color: COLORS.PRIMARY }}>
            Options
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={addMonsters}
                onChange={() => setAddMonsters((value) => !value)}
                name="add-monsters"
              />
            }
            label="Add Monsters"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={addSkills}
                onChange={() => setAddSkills((value) => !value)}
                name="add-kills"
                disabled
              />
            }
            label="Add Skills"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={addRiftLands}
                onChange={() => setAddRiftLands((value) => !value)}
                name="add-rift-lands"
              />
            }
            label="Add Aditional Rift Lands"
          />
        </FormControl>
      </FormGroup>
      <div className="setup__actions">
        <Button variant="outlined" className="btn--outline" onClick={handleStartGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Setup;
