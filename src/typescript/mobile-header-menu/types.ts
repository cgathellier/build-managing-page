type Action = 'OPEN' | 'CLOSE';

interface Observer {
	toggle(action: Action): void;
}

export { Action, Observer };
