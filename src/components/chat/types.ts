export type TDialouge = {
	id: string;
	timestamp: number;
	by: 'doctor' | 'patient';
	value: {
		file?: string;
		text?: string;
	};
};
