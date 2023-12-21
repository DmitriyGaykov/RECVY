create or replace function messageToJson(
    _from varchar(50) = null,
    _to varchar(50) = null,
    skip integer = null,
    take integer = null)
    returns json
    language plpgsql as
$$
declare
    _json json;
begin
    call checkskipandtake(skip, take);

    create temporary table _messages as
    select *
    from messages
    where iduserfrom = _isnull($1, iduserfrom)
      and iduserto = _isnull($2, iduserto)
    offset skip limit take;

    _json := (select json_agg(to_json(_messages))
              from _messages);

    drop table _messages;

    return _json;
exception
    when others then
        raise exception '%', SQLERRM;
end;
$$;

select * from messageToJson();

select *
from users
limit 1;

create or replace procedure usersFromJson(_json json)
as
$$
begin
    SELECT signup(login, firstname, lastname, age, password)
    FROM
        json_populate_recordset(null::users, $1);
end;
$$ language plpgsql;

select * from users where id in ('1', '2','3', '4');

call usersFromJson('[
  {
    "id": "1",
    "login": "888888999",
    "firstname": "Oleg",
    "lastname": "Kravchenko",
    "age": 19,
    "password": "12345612331"
  },
  {
    "id": "2",
    "login": "john_doe",
    "firstname": "John",
    "lastname": "Doe",
    "age": 28,
    "password": "password123"
  },
  {
    "id": "3",
    "login": "alice_smith",
    "firstname": "Alice",
    "lastname": "Smith",
    "age": 35,
    "password": "pass987"
  },
  {
    "id": "4",
    "login": "bob_jackson",
    "firstname": "Bob",
    "lastname": "Jackson",
    "age": 22,
    "password": "securepass"
  }
]');

do
$$
    declare
        cur cursor for select *
                       from users
                       where login = '888888999'
                          or login = 'john_doe'
                          or login = 'alice_smith'
                          or login = 'bob_jackson';
    begin
        for rec in cur
            loop
                call deleteuser(rec.id);
            end loop;
    end;
$$ language plpgsql;