import time

# Define the calculation
def calculate_age(birthdate):
    try:
        # Determine the format of the input date
        if '/' in birthdate:
            # Handle DD/MM/YYYY format
            birthdate_components = birthdate.split('/')
            birth_day = int(birthdate_components[0])
            birth_month = int(birthdate_components[1])
            birth_year = int(birthdate_components[2])
        elif '-' in birthdate:
            # Handle YYYY-MM-DD format
            birthdate_components = birthdate.split('-')
            birth_year = int(birthdate_components[0])
            birth_month = int(birthdate_components[1])
            birth_day = int(birthdate_components[2])
        else:
            raise ValueError("Date format is not recognized. Use DD/MM/YYYY or YYYY-MM-DD.")

        current_date = time.localtime()
        current_year = current_date.tm_year
        current_month = current_date.tm_mon
        current_day = current_date.tm_mday
        
        # Calculate age components
        years_diff = current_year - birth_year
        months_diff = current_month - birth_month
        days_diff = current_day - birth_day
        
        # Adjust if the current day or month is earlier than the birth day or month
        if days_diff < 0:
            months_diff -= 1
            days_diff += 30  # Approximation
        
        if months_diff < 0:
            years_diff -= 1
            months_diff += 12
        
        # Return age as an integer
        return years_diff

    except ValueError as e:
        print(str(e))
        return None  # Return None if there's an error

# Example usage
a = '1979-12-27'  # Test for DD/MM/YYYY
# a = '1980-09-15'  # Test for YYYY-MM-DD

age = calculate_age(a)
print(age)  # This will print the age as an integer
#print(type(age))