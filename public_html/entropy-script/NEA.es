"
This is a demonstration of Entropy Script. Find out more at https://entropygames.io/entropy-script

This is a solution to the Computer Science GCSE Non-Assessed-Coursework from 2020-2021

";

// doing TXT files on the web is a bit annoying and not transparent, so the data is here instead
global airportsTXT = [
    ['JFK', 'John F Kennedy International', 5326, 5486],
    ['ORY', 'Paris-Orly', 629, 379],
    ['MAD', 'Adolfo Suarez Madrid-Barajas', 1428, 1151],
    ['AMS', 'Amsterdam Schiphol', 526, 489],
    ['CAI', 'Cairo International', 3779, 3584]
];

global list_of_airports = [];

// inputted data:
global uk_airport = '';
global overseas_airport = '';
global airplane_type = -1;
global first_seats = 0;
global first_price = 0;
global standard_price = 0;

// setting the types of airplanes as ints for use in the data dict:
global medium_narrow = 0;
global large_narrow = 1;
global medium_wide = 2;

// variables for each type of airplane
global running_cost = 0;
global max_range = 1;
global max_capacity = 2;
global min_first_class = 3;

// fixed data for each type of airplane
global airplane_types_data = {
    [medium_narrow]: {
        [running_cost]: 8,
        [max_range]: 2650,
        [max_capacity]: 180,
        [min_first_class]: 8
    },
    [large_narrow]: {
        [running_cost]: 7,
        [max_range]: 5600,
        [max_capacity]: 220,
        [min_first_class]: 10
    },
    [medium_wide]: {
        [running_cost]: 5,
        [max_range]: 4050,
        [max_capacity]: 406,
        [min_first_class]: 14
    }
};

global Airplane = class {
    init (airplane_type) {
        type_data = airplane_types_data[airplane_type];

        this.running_cost = type_data[running_cost];
        this.max_range = type_data[max_range];
        this.max_capacity = type_data[max_capacity];
        this.min_first_class = type_data[min_first_class];
    }
};

global Airport = class {
    init (data) {
        this.code = data[0];
        this.name = data[1];
        this.dist_LJL = data[2];
        this.dist_BI = data[3];
    }
};

global initialise = func () {
    for (data in airportsTXT) {
        list_of_airports.add(Airport(data));
    }
};

// menu.py
global clear_data = func () {
    uk_airport = '';
    overseas_airport = undefined;
    airplane_type = 0;
    first_seats = 0;
    first_price = 0;
    standard_price = 0;
};

global enter_airport_details = func () {
    // for entering the UK airport code

    input('UK airport code (either LPL or BOH): ', func (uk_airport) {
    	let possible_airports = ['LPL', 'BOH'];
        if (possible_airports.contains(uk_airport))  // if the code is valid
            uk_airport = uk_airport
        else {
            print('Sorry, that is not a valid code, or the airport you are looking for does not exist.');
            enter_airport_details();
            return;
        }

        // for entering the overseas airport code

        var get_overseas_airport = func () {
            input('Overseas airport code: ', func (overseas_airport) {
                // loops through all the possible airport codes, and checks to see if the code matches
                let valid = false;
                for (i in list_of_airports) {
                    if (i.code == overseas_airport) {
                        valid = true;
                        overseas_airport = i;
                        print('The name of the overseas airport is ', i.name, '.');
                    }
                }

                if(!valid) {
                    print('Sorry, that is not a valid code, or the airport you are looking for does not exist.');
                    get_overseas_airport();
                }

                main_menu();

            });
        };
        get_overseas_airport();
    });
};

global enter_flight_details = func () {
    input('Type of aircraft to be used: ', func (response) {
        print(response);
        possible_types = ['medium narrow', 'large narrow', 'medium wide'];
        if (!possible_types.contains(response)) {
            print('not valid');
            enter_flight_details();
            return;
        }

        print('    -	Aircraft details:	-	');
        if (response == 'medium narrow')
            airplane_type = medium_narrow;
        else if (response == 'large narrow')
            airplane_type = large_narrow;
        else if (response == 'medium wide')
            airplane_type = medium_wide;

        let aircraft_data = airplane_types_data[airplane_type];

        print('The running cost per km is ' + aircraft_data[running_cost]).str();
        print('The maximum range in km is ' + aircraft_data[max_range]).str();
        print('The maximum capacity is ' + aircraft_data[max_capacity]).str();
        print('The minimum first class seats is ' + aircraft_data[min_first_class]).str();


        let get_first_class_seats = func () {
            input('How many first class seats?', func (first_class_seats) {
                if (first_class_seats < 0) {
                    main_menu();
                    return;
                }
                if (first_class_seats < aircraft_data[min_first_class])
                    print('That is smaller than the minimum number of first class seats for that aircraft.');
                else if (first_class_seats > aircraft_data[max_capacity] / 2)
                    print('That is larger than the maximum number of first class seats for that aircraft.');
                else {
                    first_seats = first_class_seats;
                    valid_response = true;
                    max_standard_seats = aircraft_data[max_capacity];
                    number_of_standard_seats = max_standard_seats - first_class_seats / 2;
                    print('the number of standard class seats is ' + maths.round(number_of_standard_seats)).str();
                }

                main_menu();
            });
        };
        get_first_class_seats();
    });
};

global calculate_cost = func () {
    if (uk_airport == "" || overseas_airport == undefined) {
        print('Sorry, please enter flight details first');
        main_menu();
        return;
    } else if (airplane_type == -1) {
        print('Sorry, please enter airplane type first');
        main_menu();
        return;
    } else if (first_seats == 0) {
        print('Sorry, please enter the number of first class seats first');
        main_menu();
        return;
    }
    airplane_max = airplane_types_data[airplane_type][max_range];

    let airport_dist;
    if (uk_airport == 'LJL')
        airport_dist = overseas_airport.dist_LJL;
    else
        airport_dist = overseas_airport.dist_BI;

    if (airplane_max < airport_dist) {
        print('Sorry, but the range of the selected airport is too short for the flight plan');
        main_menu();
        return;
    }

    let get_first_class_seats = func () {
        input('Please enter the price of a first class seat', func (price) {
            price = parseNum(price);
            if ((!price && price != undefined) || price < 0) {
                print('error, please try again');
                get_first_class_seats();
                return;
            }

            let get_standard_seats = func () {
                input('Please enter the price of a standard class seat', func (price) {
                    price = parseNum(price);
                    if ((!price && price != undefined) || price < 0) {
                        print('error, please try again');
                        get_standard_seats();
                        return;
                    }

                    const standard_seats = airplane_types_data[airplane_type][max_capacity] - first_seats * 2;
                    const cost_per_seat = parseNum(airplane_types_data[airplane_type][running_cost]) * airport_dist / 100;
                    const cost = cost_per_seat * (first_seats + standard_seats);
                    const income = first_seats * first_price + standard_seats * standard_price;
                    const profit = income - cost;

                    print('The flight costs ' + cost_per_seat + ' per seat.');
                    print('The flight costs ' + cost + ' in total.');
                    print('The flight has a total income of ' + income + '.');
                    print('The flight\'s profit is ' + profit + '.');

                    main_menu();
                });
            };
            get_standard_seats();
        });
    };
    get_first_class_seats();
};

// end menu.py

global main_menu = func () {
    print('What would you like to do?');
    input("You can 'calculate flight profit', 'enter airport details', 'enter flight details', 'clear data' or 'quit'\n", func (option) {
        if (option == 'quit'){}

        else if (option == 'calculate flight profit')
            calculate_cost();
        else if (option == 'enter airport details')
            enter_airport_details();
        else if (option == 'enter flight details')
            enter_flight_details();
        else if (option == 'clear data') {
            clear_data();
            main_menu();
        } else {
            print('Not an option, sorry');
            main_menu();
        }
    });
};

initialise();
main_menu();