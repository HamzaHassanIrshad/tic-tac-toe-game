import React from "react";
import { useGameState } from "./AppState";

export default function App() {
  const {
    boardValue,
    boardStatus,
    handleSquareClick,
    handleStepClick,
    boardHistory,
  } = useGameState();
  return (
    <Row gap={20}>
      <Column gap={20}>
        <Status boardStatus={boardStatus} />
        <Board boardValue={boardValue} onSquareClick={handleSquareClick} />
      </Column>
      <Log boardHistory={boardHistory} onStepClick={handleStepClick} />
    </Row>
  );
}

function Status({ boardStatus }: StatusProps) {
  return (
    <div>
      {boardStatus.type === "winner"
        ? `Winner ${boardStatus.player}`
        : boardStatus.type === "draw"
        ? "Draw"
        : `Next Player ${boardStatus.player}`}
    </div>
  );
}
function Board({ boardValue, onSquareClick }: BoardProps) {
  const createProps = (square: number): SquareProps => {
    return {
      value: boardValue[square],
      onClick: () => onSquareClick(square),
    };
  };
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Square {...createProps(0)} />
        <Square {...createProps(1)} />
        <Square {...createProps(2)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(3)} />
        <Square {...createProps(4)} />
        <Square {...createProps(5)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(6)} />
        <Square {...createProps(7)} />
        <Square {...createProps(8)} />
      </Row>
    </Column>
  );
}

const squareStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  background: "#fff",
  border: "1px solid #999",
  fontSize: "24px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Square({ value, onClick }: SquareProps) {
  return (
    <div style={squareStyle} onClick={onClick}>
      {value}
    </div>
  );
}

function Log({ boardHistory, onStepClick }: LogProps) {
  return (
    <ol>
      {boardHistory.map((_, index) => {
        return (
          <li key={index}>
            <button onClick={() => onStepClick(index)}>
              Go to {index === 0 ? "start" : `move #${index}`}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

type LayoutProps = React.PropsWithChildren<{
  gap: number;
}>;

const Row = React.memo(({ gap, children }: LayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: gap }}>
      {children}
    </div>
  );
});

const Column = React.memo(({ gap, children }: LayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: gap }}>
      {children}
    </div>
  );
});

export type Player = "X" | "O";

export type SquareValue = Player | null;

export type BoardValue = SquareValue[];

export type BoardStatus =
  | {
      type: "winner";
      player: Player;
    } 
  | {
      type: "draw";
    }
  | {
      type: "next";
      player: Player;
    };

export type BoardHistory = BoardValue[];

export type StatusProps = {
  boardStatus: BoardStatus;
};

export type SquareProps = {
  value: SquareValue;
  onClick: () => void;
};

export type BoardProps = {
  boardValue: BoardValue;
  onSquareClick: (square: number) => void;
};

export type LogProps = {
  boardHistory: BoardHistory;
  onStepClick: (step: number) => void;
};
