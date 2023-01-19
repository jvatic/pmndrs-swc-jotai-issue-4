import { useAtomValue, Atom, atom } from 'jotai';
import * as React from 'react';

function createAtom<V>(
	ov: V
): Atom<V> {
	const valueAtom = atom<V>(ov);
	const observableValueAtom = atom<V, V>(
		(get) => {
			const value = get(valueAtom);
			return value;
		},
		(_get, set, nextValue) => {
			set(valueAtom, nextValue);
		},
	);
	return observableValueAtom;
}

const value1Atom = createAtom<string>('Hello String!');
const value2Atom = createAtom<number>(50);

export function App() {
    const value1 = useAtomValue(value1Atom);
    const value2 = useAtomValue(value2Atom);
    return <div>{JSON.stringify({value1, value2}, undefined, 2)}</div>;
}
