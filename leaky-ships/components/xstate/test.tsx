import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgJbIDEAtgJ4AqArgE4EDaADALqKgAOqsJRqApxAAPRAFoALADYcATjkB2SQFYVclSwBMW9SoA0ISolWKcKgMzbpARkUtJADkdbpAXzeG0GbPmJkwAjAqOkZWDiQQHj5kASFIsQRxaRYcVUcLORtM6SdJCxtDYwQLRxt5FS1HB0UbFmlpTMkPL3QsXAB3AEMSADFUelCCUjARMABjWmQwIfDhaP5BYUSbOpwtCwLNepZtFjsixAt1ddctbIUHSpsWkG92nG6+gaGRggg5yIXYpYSTFVktWkujkGRYjkkkkOCFM5isrjsDmcrlu918T2Q-XoAFEglQRmNJtNZux5rxFvFQIldJIcAVMpoZHZ8lpFNDjnJTsDGRZFGpVKi2uiepiBrjgpQ3h9SV9yT9KaJ-oCbNzQVYIVCjEdWWljsi5Ls5JI+SoPJ4QARUBA4MI0WAyTE4ssJBtOY4UsdFDobOpJEpoSrHDhpNs5I1dpIbDoLIKfLhCCQHRTnUkbFkcO6WJ7vb7-VqYTZabU+ZsDSwsopYw8MVihkn5SnA8GVBlpHILDJTCHoX7yiwvdyIRlFLyq8Lnji8cVuHKnX8EDZqmkjQV++q+ZrirpZD79vtXWn1GPcLAABaoDq4iAAZXG9DAgXrc6piDUnOkjkUZUUI4Ucl07JLvYrJhg05zKLoZpuEAA */
    createMachine({
        predictableActionArguments: true,
        id: 'toggle',
        initial: "Init",
        context: {
            player: 1
        },
        states: {
            Init: {
                on: {
                    myTurn: "waitForTurn",
                    enemyTurn: "waitForEnemy",
                }
            },
            waitForTurn: {
                entry: ["enableUI"],
                exit: ["disableUI"],
                on: {
                    executeTurn: { target: "waitForEnemy", actions: ["switchPlayers"] },
                    end: "showEndScreen"
                }
            },
            waitForEnemy: {
                on: {
                    executeTurn: { target: "waitForTurn", actions: ["switchPlayers"] },
                    end: "showEndScreen"
                }
            },
            showEndScreen: {
                type: "final"
            }
        }
    },
        {
            actions: {
                switchPlayers: (context, event) => {
                    return context.player ? 0 : 1
                },
                enableUI: (context, event) => { },
                disableUI: (context, event) => { }
            }
        }
    );

export const XStateTest = () => {
    const [state, send] = useMachine(toggleMachine);

    return (
        <div>
            {JSON.stringify({
                value: state.value,
                context: state.context
            }, null, 2)}
            {state.nextEvents.map((event, i) => <div key={i}>
                <button onClick={() => send(event)}>{event}</button>
            </div>)}
        </div>
    );
};