#! /bin/bash

# Demo Airbrite keys
#
# account:  demo@airbrite.io works
# password: demo
# airbrite keys:
# "sk_test": "sk_test_NmMwNjQ3YWQtMzA3Yy00MDJhLWI2MjgtMjM0N2JlYzE2YWUx",
# "pk_test": "pk_test_ZmM0MjRiNzEtNDA0MS00YjVlLTk0NjYtMTU4NTE0NTkyOGM1",
# "sk_live": "sk_live_ZTMxNTQwM2ItODJjOS00ZTMzLTlkOTktNGNkNDU4NjZmNjI4",
# "pk_live": "pk_live_NTFhZTc2NDktZGRhZC00ODcyLWFiNDgtYTQ3MmRiYzkzOGU3",
# stripe keys:
# test pk: pk_test_pl28Luc4dvgJq0Wgvdms7dTZ
# test sk: sk_test_tJpsiy7on0O6hYJozqTlQWlH


# Create the red koala
curl https://api.airbrite.io/v2/products \
    -X POST \
    -H "Content-Type: application/json" \
    -u sk_test_NmMwNjQ3YWQtMzA3Yy00MDJhLWI2MjgtMjM0N2JlYzE2YWUx:demo \
    -d '{"sku":"koala-test-1","quantity":1000,"name":"Red Koala","price":500}' \
    | python -m json.tool

# {
#     "data": {
#         "_id": "528ab1cf363b25060000000e",
#         "created_at": "2013-11-19T00:33:19.928Z",
#         "description": null,
#         "inventory": null,
#         "metadata": {},
#         "name": "Red Koala",
#         "price": 500,
#         "sku": "koala-test-1",
#         "updated_at": "2013-11-19T00:33:19.928Z",
#         "user_id": "528aaf39da5a3d0000000001",
#         "version": 1,
#         "weight": null
#     },
#     "meta": {
#         "code": 201,
#         "env": "live",
#         "resource": "product"
#     }
# }


# Create the blue koala
curl https://api.airbrite.io/v2/products \
    -X POST \
    -H "Content-Type: application/json" \
    -u sk_test_NmMwNjQ3YWQtMzA3Yy00MDJhLWI2MjgtMjM0N2JlYzE2YWUx:demo \
    -d '{"sku":"koala-test-2","quantity":1000,"name":"Blue Koala","price":100}' \
    | python -m json.tool

# {
#     "data": {
#         "_id": "528ab233ec4ef10800000001",
#         "created_at": "2013-11-19T00:34:59.322Z",
#         "description": null,
#         "inventory": null,
#         "metadata": {},
#         "name": "Blue Koala",
#         "price": 100,
#         "sku": "koala-test-2",
#         "updated_at": "2013-11-19T00:34:59.322Z",
#         "user_id": "528aaf39da5a3d0000000001",
#         "version": 1,
#         "weight": null
#     },
#     "meta": {
#         "code": 201,
#         "env": "test",
#         "resource": "product"
#     }
# }


# Create the green koala
curl https://api.airbrite.io/v2/products \
    -X POST \
    -H "Content-Type: application/json" \
    -u sk_test_NmMwNjQ3YWQtMzA3Yy00MDJhLWI2MjgtMjM0N2JlYzE2YWUx:demo \
    -d '{"sku":"koala-test-3","quantity":1000,"name":"Green Koala","price":2000}' \
    | python -m json.tool

# {
#     "data": {
#         "_id": "528ab2380c1ee50700000009",
#         "created_at": "2013-11-19T00:35:04.890Z",
#         "description": null,
#         "inventory": null,
#         "metadata": {},
#         "name": "Green Koala",
#         "price": 2000,
#         "sku": "koala-test-3",
#         "updated_at": "2013-11-19T00:35:04.890Z",
#         "user_id": "528aaf39da5a3d0000000001",
#         "version": 1,
#         "weight": null
#     },
#     "meta": {
#         "code": 201,
#         "env": "test",
#         "resource": "product"
#     }
# }
