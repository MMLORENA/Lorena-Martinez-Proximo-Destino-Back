# **Lista de enpoints públicos**:

## **ENDPOINTS USERS**:

◾ **[POST]/user/register** ➡ Recibe datos al registrar a un usuario.

    ✅ STATUS 201

◾ **[POST]/user/login** ➡ Recibe datos del usuario para comprobar si está creado en la BD.

    ✅ STATUS 200

## **2. ENDPOINTS DESTINATIONS**:

◾ **[GET]/destinations**➡ Devuelve un array con todos destinos.

    ✅ STATUS: 200

◾ **[GET]/destinations/:idDestination**➡ Devuelve un objeto del Destino.

    ✅ STATUS: 200

◾ **[POST]/destinations/create**➡ Recibe un objeto Destination sin id para crearlo en la BD y devuelve el mismo objeto con id creada.

     ✅ STATUS: 201

◾ **[PUT]/destinations/update**➡ Recibe un robot completo, realiza las modificaciones en la BD con la misma id y devuelve el objeto destino modificado.
✅ STATUS: 201

◾ **[DELETE]/destinations/delete/:idDestino**➡ elimina de la BD el destino por id y devuelve el objeto eliminado.

    ✅ STATUS: 201

# STATUS ERRORES:

❌ **400** ➡ Bad Request.

❌ **403** ➡ Forbbiden.

❌ **404** ➡ Not found.

❌ **409** ➡ Conflicts.

❌ **500** ➡ Internal Server Error.
