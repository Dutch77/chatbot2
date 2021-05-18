import Eval from '@/Core/Processors/Eval';
import Rnd from '@/Core/Processors/Rnd';
import Help from '@/Core/Processors/Help';
import Joke from '@/Core/Processors/Joke';
import JokeSave from '@/Core/Processors/JokeSave';
import Var from '@/Core/Processors/Var';
import VarSave from '@/Core/Processors/VarSave';
import Cmd from '@/Core/Processors/Cmd';
import CmdSave from '@/Core/Processors/CmdSave';

export default async ({connection}) => {
  const processors = {};

  processors['$eval'] = new Eval();
  processors['$rnd'] = new Rnd();
  processors['$help'] = new Help(processors);
  processors['$joke'] = new Joke(connection);
  processors['$jokeLoad'] = new Joke(connection);
  processors['$jokeSave'] = new JokeSave(connection);
  processors['$var'] = new Var(connection);
  processors['$varLoad'] = new Var(connection);
  processors['$varSave'] = new VarSave(connection);
  processors['$cmd'] = new Cmd(connection);
  processors['$cmdLoad'] = new Cmd(connection);
  processors['$cmdSave'] = new CmdSave(connection);

  return {
    processors,
  };
};