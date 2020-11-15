create table products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
	description VARCHAR,
	price INT
);

create table stocks (
  product_id uuid,
  count INT,
  foreign key ("product_id") references "products" ("id")
);

with product as (
insert into products(title, description, price) values
('Bristlecone', 'Manufactured by Google, 72 qubits', 23000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Sycamore', 'Manufactured by Google, 54 qubits', 19000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Tenerife', 'Manufactured by IBM, 5 qubits', 1000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Yorktown', 'Manufactured by IBM, 5 qubits', 1000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Melbourne', 'Manufactured by IBM, 14 qubits', 2000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Rüschlikon', 'Manufactured by IBM, 16 qubits', 2300000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Tokyo', 'Manufactured by IBM, 20 qubits', 12000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Austin', 'Manufactured by IBM, 20 qubits', 12000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Acorn', 'Manufactured by Rigetti, 19 qubits', 17000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Agave', 'Manufactured by Rigetti, 8 qubits', 7000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Tangle Lake', 'Manufactured by Intel, 49 qubits', 18000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('2000Q', 'Manufactured by D-Wave, based on annealing, 2048 qubits', 15000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

with product as (
insert into products(title, description, price) values
('Advantage', 'Manufactured by D-Wawe, based on annealing, 5000 qubits', 22000000) returning id )
insert into	stocks(product_id, count) values((select id from product), 1);

select * from products JOIN stocks s2 on products.id = s2.product_id;