# Exercise 1: Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

1. What columns violate 1NF?
2. What entities do you recognize that could be extracted?
3. Name all the tables and columns that would make a 3NF compliant solution.

+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+

## ANSWERS

1. This table is not in 1NF because rule (1) of 1NF is violated because columns 'food_code' and 'food_description' contain multiple values in rows.
          **1NF (5 rules)**

      1) Single valued columns (each column should have atomic value, no multiple values)
      2) Column domain (for any column) should not change.
      3) Unique names for columns.
      4) Order (of rows/columns) does not matter.
      5) No duplicate records (every record has a primary key).

2. Members are the entities that could be extracted.

3. To make a 3NF compliant solution for the given table, the following tables and columns would be needed:

Members table:
+-----------+---------------+----------------+
| member_id | member_name   | member_address |
+-----------+---------------+----------------+

Dinners table:
+-----------+-------------+-------------+
| dinner_id | dinner_date | venue_code |
+-----------+-------------+-------------+
dinner_date rows must be in the same format.

Venues table:
+------------+-------------------+
| venue_code | venue_description |
+------------+-------------------+

Foods table:
+-----------+------------------+
| food_code | food_description |
+-----------+------------------+

Dinner_Food table:
+-----------+-----------+
| dinner_id | food_code |
+-----------+-----------+

Members_Dinner table:
+-----------+-----------+
| member_id | dinner_id |
+-----------+-----------+
