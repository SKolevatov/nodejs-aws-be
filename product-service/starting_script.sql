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

insert into products (title, description, price) values
('Bristlecone', 'Manufactured by Google, 72 qubits', 23000000),
('Sycamore', 'Manufactured by Google, 54 qubits', 19000000),
('Tenerife', 'Manufactured by IBM, 5 qubits', 1000000),
('Yorktown', 'Manufactured by IBM, 5 qubits', 1000000),
('Melbourne', 'Manufactured by IBM, 14 qubits', 2000000),
('Rüschlikon', 'Manufactured by IBM, 16 qubits', 2300000),
('Tokyo', 'Manufactured by IBM, 20 qubits', 12000000),
('Austin', 'Manufactured by IBM, 20 qubits', 12000000),
('Acorn', 'Manufactured by Rigetti, 19 qubits', 17000000),
('Aspen-1', 'Manufactured by Rigetti, 16 qubits', 15000000),
('Agave', 'Manufactured by Rigetti, 8 qubits', 7000000),
('Tangle Lake', 'Manufactured by Intel, 49 qubits', 18000000),
('2000Q', 'Manufactured by D-Wave, based on annealing, 2048 qubits', 15000000),
('Advantage', 'Manufactured by D-Wawe, based on annealing, 5000 qubits', 22000000);



insert into stocks (product_id, count) values
('500ea129-5370-4cf4-bae1-9bdd2ec54d44', 1),
('771ef66b-3b54-4ebe-99ad-814966d5a355', 1),
('46a48d60-ad2d-493d-a323-2d6a12d6bd0b', 1),
('1be1d1ae-077c-40e5-84db-2c3f53e73485', 1),
('b1599554-e22b-4ba9-a7cd-ceb834e594a6', 1),
('2be6781b-2689-47f1-88b1-759f19f24757', 1),
('d0e2a25a-bab3-4c46-948a-02bd6d6e16f1', 1),
('309648f3-f278-4173-9703-5ef1d9578cf2', 1),
('455936a8-1a68-4b63-ad49-bef6a1b64007', 1),
('cf8458d7-b2b9-401e-957c-b6f56ea1c751', 1),
('611b54a3-2ab4-48bd-8054-486135e5debf', 1),
('d1085e35-987f-4187-b6de-b96c929cb6f2', 1),
('584fcb44-83e5-4fd9-bf52-e3d9c284e742', 10),
('0cf483de-025a-49fd-a58b-c5227ac3e29b', 5);

select * from products JOIN stocks s2 on products.id = s2.product_id;