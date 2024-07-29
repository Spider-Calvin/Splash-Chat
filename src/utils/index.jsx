import { GrowthBook } from '@growthbook/growthbook-react';
import dayjs from 'dayjs';

const growthBook = new GrowthBook({
	apiHost: 'https://cdn.growthbook.io',
	clientKey: 'sdk-ThWN42bEh60Ijrg',
	enableDevMode: true,
	subscribeToChanges: true,
	trackingCallback: (experiment, result) => {
		console.log('Viewed Experiment', {
			experimentId: experiment.key,
			variationId: result.key,
		});
	},
});

const sWidth = (Value = 0) => {
	const screenWidth = window.innerWidth > 1200 ? 1200 : window.innerWidth;

	return (Value / 100) * screenWidth;
};

function formatRupees(number) {
	if (!number) return 'NA';

	let suffix = '';
	if (number >= 10000000) {
		suffix = ' Crores';
		number /= 10000000;
	} else if (number >= 100000) {
		suffix = ' Lacs';
		number /= 100000;
	}

	const formatter = new Intl.NumberFormat('en-IN');
	const formattedNumber = Number.parseFloat(formatter.format(number)).toFixed(2);
	return `₹${formattedNumber}${suffix}`;
}

const validRegex = {
	email: new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'),
	phone: new RegExp('^[0-9]{10}$'),
	otp: new RegExp('^[0-9]{6}'),
};

function capitalize(str) {
	return str
		?.replace(/_/g, ' ') // Replace underscores with spaces
		.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
}

const dateFormatter = (date = '') => {
	if (dayjs(date).isValid()) return dayjs(date).format('DD MMM YYYY');
	else return 'NA';
};

const localRupeesFormat = (amount = '') => {
	if (amount) return `₹ ${parseInt(amount)?.toLocaleString('en-IN')}`;
	else return 'NA';
};

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const slickSettings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
};

const fadeIn = (direction, type, delay, duration) => {
	return {
		hidden: {
			x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			opacity: 0,
		},
		show: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: {
				type: type,
				delay: delay,
				duration: duration,
				ease: 'easeOut',
			},
		},
	};
};

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function replaceUnderscoresAndCapitalize(str, sufix = '') {
	if (!str) return 'NA';
	if (typeof str !== 'string') return str > 100 ? `₹ ${numberWithCommas(str)}` : str;

	if (str === 'nocopayment') return 'No Copayment';

	const stringWithSpaces = str.replace(/_/g, ' ');
	const lines = stringWithSpaces.split('\n');
	const capitalizedLines = lines.map(line => {
		const words = line.split(/\s+/);
		const capitalizedWords = words.map(
			word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
		);
		return capitalizedWords.join(' ');
	});

	const capitalizedString = capitalizedLines.join('\n');

	if (typeof str === 'string') return capitalizedString;
	else return capitalizedString + sufix;
}

const policydisplayformat = {
	basic_coverage_details: {
		1: {
			id: 'min_age',
			ques: 'Min Age',
		},
		2: {
			id: 'max_age',
			ques: 'Max Age',
		},
		3: {
			id: 'standard_hospitalization',
			ques: 'Standard Hospitalization',
		},
		4: {
			id: 'room_rent_for_normal',
			ques: 'Room Rent for Normal Hospitalization',
		},
		5: {
			id: 'room_rent_for_icu',
			ques: 'Room Rent for ICU Hospitalization',
		},
		6: {
			id: 'copaymentemployee',
			ques: 'Copayment Employee',
			sufix: '%',
		},
		7: {
			id: 'copaymentspouse',
			ques: 'Copayment Spouse',
			sufix: '%',
		},
		8: {
			id: 'copaymentchild',
			ques: 'Copayment Child',
			sufix: '%',
		},
		9: {
			id: 'copaymentparent',
			ques: 'Copayment Parents',
			sufix: '%',
		},
		10: {
			id: 'ambulance_charges',
			ques: 'Ambulance Charges',
		},
		11: {
			id: 'day_care',
			ques: 'Day Care',
		},
		12: {
			id: 'internal_congenital_diseases',
			ques: 'Internal Congenital Diseases',
		},
		13: {
			id: 'external_congenital_diseases',
			ques: 'External Congenital Diseases',
		},
		14: {
			id: 'ayush',
			ques: 'Ayush Coverage',
		},
		15: {
			id: 'dental_cover',
			ques: 'Dental Coverage',
		},
		16: {
			id: 'opd',
			ques: 'OPD Coverage',
		},
		17: {
			id: 'dependent_child',
			ques: 'Dependent Child Covered',
		},
		18: {
			id: 'health_checkup',
			ques: 'Health Checkup',
		},
		19: {
			id: 'modern_treatment',
			ques: 'Modern Treatment',
		},
		20: {
			id: 'ailment_sublimit',
			ques: 'Ailment Sublimit',
		},
	},
	maternity_benefits: {
		1: {
			id: 'maternity_waiting_period',
			ques: 'Maternity Waiting Period',
		},
		2: {
			id: 'maternity_cover_benefit',
			ques: 'Maternity Cover Benefit',
		},
		3: {
			id: 'normal_delivery_limit',
			ques: 'Normal Delivery Limit',
		},
		4: {
			id: 'csection_limit',
			ques: 'C-section Limit',
		},
		5: {
			id: 'baby_cover_day1',
			ques: 'Baby cover day 1',
		},
		6: {
			id: 'baby_cover_day1_details',
			ques: 'Baby cover day 1 Details',
		},
		7: {
			id: 'pre_and_post_natal_costs',
			ques: 'Pre & Post Natal Costs',
		},
		8: {
			id: 'pre_and_post_natal_limit',
			ques: 'Pre & Post Natal Limit',
		},
		9: {
			id: 'number_pregnancies_covered',
			ques: 'Number of Pregnancies Covered',
		},
	},
	eye_cover_details: {
		1: {
			id: 'lasik_cover',
			ques: 'Lasik Cover',
			prefix: 'Covered Upto',
		},
		3: {
			id: 'cataract_cover',
			ques: 'Cataract Cover per eye',
		},
	},
	waiting_period: {
		1: {
			id: 'waiting_period',
			ques: 'Waiting Period',
		},
		2: {
			id: 'pre_existing_diseases',
			ques: 'Pre existing diseases',
		},
		3: {
			id: 'first_year_exclusion',
			ques: '1st year exclusion',
		},
		4: {
			id: 'first_30_days_exclusion',
			ques: '1st 30 days exclusion',
		},
		5: {
			id: 'first_second',
			ques: 'First & Second year exclusion condition for specific dieases',
		},
	},
	prepost_hospitalization_benefits: {
		1: {
			id: 'prehospitalization_expenses_terms',
			ques: 'Pre-Hospitalization Expenses Term',
		},
		2: {
			id: 'prehospitalization_expenses_duration',
			ques: 'Pre-Hospitalization Expenses Duration',
		},
		3: {
			id: 'posthospitalization_expenses_terms',
			ques: 'Post-Hospitalization Expenses Terms',
		},
		4: {
			id: 'posthospitalization_expenses_duration',
			ques: 'Post-Hospitalization Expenses Duration',
		},
	},
	administrative: {
		1: {
			id: 'mid_term_enrollment_existing_dependents',
			ques: 'Mid Term enrollment of existing Dependents',
		},
		2: {
			id: 'mid_term_enrollment_new_joinees_employees_dependents',
			ques: 'Mid Term enrollment of New Joinees (Employee & Dependents)',
		},
		3: {
			id: 'mid_term_enrollment_of_new_dependents',
			ques: 'Mid term enrollment of new dependents (Newlywed Spouse/ Newborn Children) upto',
		},
	},
};

const specialCharFilter = (value, email = false) => {
	const specialCharactersRegex = email
		? /[!#$%^&*()<>\/}{[\]=\-]/g // Allow + and @ for email
		: /[!#$%^&*()<>\/}{[\]=+\-@]/g;

	const text = value.replace(specialCharactersRegex, '');
	return text;
};

export {
	growthBook,
	sWidth,
	formatRupees,
	validRegex,
	capitalize,
	dateFormatter,
	generateRandomString,
	slickSettings,
	fadeIn,
	replaceUnderscoresAndCapitalize,
	policydisplayformat,
	localRupeesFormat,
	specialCharFilter,
};
