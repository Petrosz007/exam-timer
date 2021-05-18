import { Duration } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTimer } from "./useTimer";

import './Timer.css';

export const Timer = ({ duration, questions }: { 
    duration: number,
    questions: number,
 }) => {
    const [questionsRemaining, setQuestionsRemaining] = useState(questions);

    const [mainTimeRemaining, startMainTimer] = useTimer(duration);
    const [questionTimeRemaining, startQuestionTimer] = useTimer(duration);

    const calcQuestionDuration = (time: Duration, questions: number) => {
        if(time.toMillis() <= 0 || questions <= 0) 
            return Duration.fromMillis(0);

        return Duration.fromMillis(time.toMillis() / questions);
    }

    const questionDuration = useMemo(() => calcQuestionDuration(mainTimeRemaining, questionsRemaining), [mainTimeRemaining, questionsRemaining]);

    const doneOne = useCallback(() => {
        if(questionsRemaining <= 0) return;

        const newQuestionDuration = calcQuestionDuration(mainTimeRemaining, (questionsRemaining - 1));
        setQuestionsRemaining(x => x - 1);
        startQuestionTimer(newQuestionDuration.toMillis());
    }, [questionsRemaining, setQuestionsRemaining, mainTimeRemaining, startQuestionTimer]);

    const redoOne = useCallback(() => {
        const newQuestionDuration = calcQuestionDuration(mainTimeRemaining, (questionsRemaining + 1));
        setQuestionsRemaining(x => x + 1);
        startQuestionTimer(newQuestionDuration.toMillis());
    }, [questionsRemaining, setQuestionsRemaining, mainTimeRemaining, startQuestionTimer]);

    useEffect(() => { 
        startMainTimer(duration);
        startQuestionTimer(questionDuration.toMillis());
    }, []);

    return (
        <div className="timer">
            <div className="buttonGroup">
                <button onClick={() => doneOne()}>Done one</button>
                <button onClick={() => redoOne()}>Redo one</button>
            </div>
            <p><span className="bigger">{questionsRemaining}</span><br/>questions</p>
            <p><span className="bigger">{mainTimeRemaining.toFormat("mm:ss")}</span><br/>Time remaining</p>
            <p><span className="bigger">{questionTimeRemaining.toFormat("mm:ss")}</span><br/>Time for this question</p>
            <p><span className="bigger">{questionDuration.toFormat("mm:ss")}</span><br/>Time per question</p>
            {mainTimeRemaining.toMillis() <= 0 &&
                <p>End of the exam</p>
            }
            {questionTimeRemaining.toMillis() <= 0 &&
                <p>End of the question time</p>
            }
        </div>
    );
}