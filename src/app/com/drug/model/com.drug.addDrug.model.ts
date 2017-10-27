export class Drug{
    id: number;
	drugName: string;
	dosageAdministration: string;
    indicationsUsage: string;
	dosageFormStrength: string;
	contraindictions: string;
	warningsPrecaustions: string;
	adverseReactions: string;
	drugInteractions: string;
	useInSpecificPopulations: string;
	availableAtAvella: number;
    drugCategoryId: string;
	siteUrl: string;
	drugType: number;
    prescribingInfo: string;
	tradeMark: string;
};

export class DrugCategory {
	id: number;
	categoryName: string;
}

export class DrugTables {
	id: number;
	drugName: string;
	dosageAdministration: string;
	indicationsUsage: string;
	dosageFormStrength: string;
	contraindictions: string;
	warningsPrecaustions: string;
	adverseReactions: string;
	drugInteractions: string;
	useInSpecificPopulationsv
	availableAtAvella: number;
	drugCategoryId: number;
	siteUrl: string;
	drugType: number;
	prescribingInfo: string;
	tradeMark: string;
	categoryName: string;
}