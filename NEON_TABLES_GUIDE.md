# 🎯 Guia: Visualizar Tabelas no Neon

## ✅ **Confirmação: Suas tabelas EXISTEM!**

Executamos `prisma db pull` e confirmamos que o banco tem **4 tabelas**:

- `User`
- `Barbershop`
- `BarbershopServices`
- `Booking`

## 🔍 **Como visualizar no Neon Dashboard:**

### Opção 1: SQL Editor (Recomendado)

1. Acesse: https://console.neon.tech
2. Selecione seu projeto
3. Clique em **"SQL Editor"** no menu lateral
4. Execute esta query:

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Opção 2: Ver dados nas tabelas

```sql
-- Ver estrutura da tabela Barbershop
SELECT * FROM "Barbershop" LIMIT 5;

-- Ver estrutura da tabela User
SELECT * FROM "User" LIMIT 5;

-- Ver estrutura da tabela BarbershopServices
SELECT * FROM "BarbershopServices" LIMIT 5;

-- Ver estrutura da tabela Booking
SELECT * FROM "Booking" LIMIT 5;
```

**⚠️ Importante:** Use aspas duplas porque as tabelas foram criadas com nomes case-sensitive!

### Opção 3: Ver no painel "Tables"

1. No console do Neon, clique em **"Tables"**
2. Se não aparecer, clique no ícone de **refresh** (🔄)
3. Certifique-se de estar no schema **"public"**

## 📊 **Popular o banco com dados:**

As tabelas existem mas estão vazias. Vamos populá-las:

```bash
# 1. Garantir que o Prisma Client está atualizado
npx prisma generate

# 2. Executar o seed
npx tsx prisma/seed.ts
```

## 🔧 **Se o seed falhar:**

Execute este comando para recriar as tabelas:

```bash
# Reset completo (⚠️ apaga todos os dados!)
npx prisma migrate reset --force

# Aplicar migrations
npx prisma migrate deploy
```

## 📝 **Verificar dados após seed:**

No SQL Editor do Neon, execute:

```sql
-- Contar registros em cada tabela
SELECT
  'Barbershop' as tabela, COUNT(*) as total FROM "Barbershop"
UNION ALL
SELECT
  'BarbershopServices', COUNT(*) FROM "BarbershopServices"
UNION ALL
SELECT
  'User', COUNT(*) FROM "User"
UNION ALL
SELECT
  'Booking', COUNT(*) FROM "Booking";
```

## 🎯 **Resumo:**

✅ **Tabelas criadas:** SIM (confirmado com `prisma db pull`)  
✅ **Schema:** `public`  
✅ **Nomes:** Case-sensitive com PascalCase  
❌ **Dados:** Tabelas vazias (precisa rodar seed)

## 💡 **Dica:**

O Neon às vezes não atualiza a interface automaticamente. Use o **SQL Editor** para ter certeza de que está vendo o estado real do banco!

---

**Próximo passo:** Rodar o seed para popular as tabelas! 🚀
