/*
 * AUTHOR: Fábio Pereira da Silva
 * YEAR: 2020
 * LICENSE: MIT
 * EMAIL: fabioegel@gmail.com or fabioegel@protonmail.com
 *
 * Main file that integrates Nano cryptocurrency P2PoW/DPoW support with myNanoEmbedded C library for PHP library
 *
 */

//sexta-feira 01 mai 2020 22:05:15 -03

#define F_IA64
#ifdef HAVE_CONFIG_H
 #include "config.h"
#endif

#include "php.h"
#include "php_ini.h"
#include "ext/standard/info.h"
#include "php_mynanoembedded.h"
#include "zend_exceptions.h"
#include "f_nano_crypto_util.h"

#include <stdint.h>
#include <string.h>

void gen_rand_no_entropy(void *output, size_t output_len)
{
   FILE *f;
   size_t rnd_sz, left;

   if (!(f=fopen("/dev/urandom", "r")))
      return;

   rnd_sz=0;
   left=output_len;

   while ((rnd_sz+=fread(output+rnd_sz, 1, left, f))<output_len)
      left-=rnd_sz;

   fclose(f);

   return;

}

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Sig_Parm, 0, 0, 3)
    ZEND_ARG_INFO(0, signature)
    ZEND_ARG_INFO(0, message)
    ZEND_ARG_INFO(0, nano_pk)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Verify_Work, 0, 0, 2)
    ZEND_ARG_INFO(0, hash)
    ZEND_ARG_INFO(0, work)
    ZEND_ARG_INFO(0, threshold)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Public_Key_2_Nano_Wallet, 0, 0, 1)
    ZEND_ARG_INFO(0, public_key)
    ZEND_ARG_INFO(0, nano_prefix)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_None, 0, 0, 0)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_PoW, 0, 0, 2)
    ZEND_ARG_INFO(0, hash)
    ZEND_ARG_INFO(0, n_thr)
    ZEND_ARG_INFO(0, threshold)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_NanoWallet, 0, 0, 1)
    ZEND_ARG_INFO(0, Nano)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_ConvertBalance, 0, 0, 2)
    ZEND_ARG_INFO(0, balance)
    ZEND_ARG_INFO(0, type)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GenerateSeed, 0, 0, 1)
    ZEND_ARG_INFO(0, entropy)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Entropy, 0, 0, 1)
    ZEND_ARG_INFO(0, entropy)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_NanoSeedToBip39, 0, 0, 2)
    ZEND_ARG_INFO(0, seed)
    ZEND_ARG_INFO(0, dictionary_path)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Bip39ToNanoSeed, 0, 0, 2)
    ZEND_ARG_INFO(0, bip39)
    ZEND_ARG_INFO(0, dictionary_path)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_NanoSeedToNanoKeyPair, 0, 0, 2)
    ZEND_ARG_INFO(0, seed)
    ZEND_ARG_INFO(0, wallet_number)
    ZEND_ARG_INFO(0, prefix)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_AddSubBalance, 0, 0, 3)
    ZEND_ARG_INFO(0, valueA)
    ZEND_ARG_INFO(0, valueB)
    ZEND_ARG_INFO(0, type)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Compare, 0, 0, 3)
    ZEND_ARG_INFO(0, valueA)
    ZEND_ARG_INFO(0, valueB)
    ZEND_ARG_INFO(0, type)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_Brainwallet, 0, 0, 3)
    ZEND_ARG_INFO(0, brainwallet)
    ZEND_ARG_INFO(0, salt)
    ZEND_ARG_INFO(0, mode)
    ZEND_ARG_INFO(0, dictionary_path)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GenerateToken, 0, 0, 2)
    ZEND_ARG_INFO(0, data)
    ZEND_ARG_INFO(0, password)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_VerifyToken, 0, 0, 3)
    ZEND_ARG_INFO(0, token)
    ZEND_ARG_INFO(0, data)
    ZEND_ARG_INFO(0, password)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_ToMultiplier, 0, 0, 2)
    ZEND_ARG_INFO(0, difficulty)
    ZEND_ARG_INFO(0, base_difficulty)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_FromMultiplier, 0, 0, 2)
    ZEND_ARG_INFO(0, multiplier)
    ZEND_ARG_INFO(0, base_difficulty)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GenerateBlock, 0, 0, 9)
    ZEND_ARG_INFO(0, account)
    ZEND_ARG_INFO(0, previous)
    ZEND_ARG_INFO(0, representative)
    ZEND_ARG_INFO(0, balance)
    ZEND_ARG_INFO(0, balance_type)
    ZEND_ARG_INFO(0, val_send_rec)
    ZEND_ARG_INFO(0, val_send_rec_type)
    ZEND_ARG_INFO(0, link)
    ZEND_ARG_INFO(0, direction)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_SignBlock, 0, 0, 3)
    ZEND_ARG_INFO(0, user_block)
    ZEND_ARG_INFO(0, fee_block)
    ZEND_ARG_INFO(0, private_key)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_ExtractPkOrLinkFromBlock, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
    ZEND_ARG_INFO(0, type)
    ZEND_ARG_INFO(0, prefix)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GetPrevious, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GetBalance, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
    ZEND_ARG_INFO(0, balance_type)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GetSignature, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GetPrefixes, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
ZEND_END_ARG_INFO()

ZEND_BEGIN_ARG_INFO_EX(My_NanoCEmbedded_GetWork, 0, 0, 1)
    ZEND_ARG_INFO(0, block)
ZEND_END_ARG_INFO()

static zend_class_entry *f_exception_ce;

static zend_object *f_exception_create_object(zend_class_entry *ce) {
    zend_object *obj=zend_ce_exception->create_object(ce);
    zval obj_zv, rv, *trace;

    ZVAL_OBJ(&obj_zv, obj);
    trace=zend_read_property(zend_ce_exception, &obj_zv, "trace", sizeof("trace")-1, 0, &rv);
    if (trace && Z_TYPE_P(trace) == IS_ARRAY) {
        zval *frame=NULL;
        ZEND_HASH_FOREACH_VAL(Z_ARRVAL_P(trace), frame) {
            if (Z_TYPE_P(frame)==IS_ARRAY) {
                zval *args=zend_hash_str_find(Z_ARRVAL_P(frame), "args", sizeof("args")-1);

                if (args != NULL) {
#ifdef ZVAL_EMPTY_ARRAY
                    zval_ptr_dtor(args);
                    ZVAL_EMPTY_ARRAY(args);
#else
                    if (Z_TYPE_P(args) == IS_ARRAY) {
                        zend_hash_clean(Z_ARRVAL_P(args));
                    }
#endif
                }
            }
        }
        ZEND_HASH_FOREACH_END();
    }
    return obj;
}

#define F_DEFAULT_NANO_POW_THRESHOLD (char *)"0xffffffc000000000"
#define REAL_TO_RAW (int)(1<<8)
#define RAW_TO_REAL F_RAW_TO_STR_STRING
#define REAL_TO_HEX (int)(1<<9)
#define HEX_TO_REAL (int)(1<<10)
#define RAW_TO_HEX (int)(1<<11)
#define HEX_TO_RAW (int)(1<<12)
#define VALUE_TO_SEND (zend_long)(1<<0)
#define VALUE_TO_RECEIVE (zend_long)(1<<1)
#define BALANCE_RAW_128 F_NANO_A_RAW_128
#define BALANCE_REAL_STRING F_NANO_A_REAL_STRING
#define BALANCE_RAW_STRING F_NANO_A_RAW_STRING
#define VALUE_SEND_RECEIVE_RAW_128 F_NANO_B_RAW_128
#define VALUE_SEND_RECEIVE_REAL_STRING F_NANO_B_REAL_STRING
#define VALUE_SEND_RECEIVE_RAW_STRING F_NANO_B_RAW_STRING

PHP_MINIT_FUNCTION(mynanoembedded)
{

   zend_class_entry ce;

   INIT_CLASS_ENTRY(ce, "MyNanoCEmbeddedException", NULL);

   f_exception_ce=zend_register_internal_class_ex(&ce, zend_ce_exception);
   f_exception_ce->create_object = f_exception_create_object;

   REGISTER_STRING_CONSTANT("DEFAULT_NANO_POW_THRESHOLD", F_DEFAULT_NANO_POW_THRESHOLD, CONST_CS|CONST_PERSISTENT);
   REGISTER_STRING_CONSTANT("NANO_PREFIX", NANO_PREFIX, CONST_CS|CONST_PERSISTENT);
   REGISTER_STRING_CONSTANT("XRB_PREFIX", XRB_PREFIX, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("REAL_TO_RAW", REAL_TO_RAW, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("RAW_TO_REAL", RAW_TO_REAL, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("REAL_TO_HEX", REAL_TO_HEX, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("HEX_TO_REAL", HEX_TO_REAL, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("RAW_TO_HEX", RAW_TO_HEX, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("HEX_TO_RAW", HEX_TO_RAW, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("ENTROPY_TYPE_PARANOIC", F_ENTROPY_TYPE_PARANOIC, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("ENTROPY_TYPE_EXCELENT", F_ENTROPY_TYPE_EXCELENT, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("ENTROPY_TYPE_GOOD", F_ENTROPY_TYPE_GOOD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("ENTROPY_TYPE_NOT_ENOUGH", F_ENTROPY_TYPE_NOT_ENOUGH, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("ENTROPY_TYPE_NOT_RECOMENDED", F_ENTROPY_TYPE_NOT_RECOMENDED, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_ADD_A_B", F_NANO_ADD_A_B, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_SUB_A_B", F_NANO_SUB_A_B, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_RES_RAW_128", F_NANO_RES_RAW_128, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_RES_RAW_STRING", F_NANO_RES_RAW_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_RES_REAL_STRING", F_NANO_RES_REAL_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_A_RAW_128", F_NANO_A_RAW_128, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_A_RAW_STRING", F_NANO_A_RAW_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_A_REAL_STRING", F_NANO_A_REAL_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_B_RAW_128", F_NANO_B_RAW_128, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_B_RAW_STRING", F_NANO_B_RAW_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_B_REAL_STRING", F_NANO_B_REAL_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_COMPARE_EQ", F_NANO_COMPARE_EQ, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_COMPARE_LT", F_NANO_COMPARE_LT, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_COMPARE_LEQ", F_NANO_COMPARE_LEQ, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_COMPARE_GT", F_NANO_COMPARE_GT, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("NANO_COMPARE_GEQ", F_NANO_COMPARE_GEQ, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_VERY_POOR ", F_BRAIN_WALLET_VERY_POOR , CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_POOR", F_BRAIN_WALLET_POOR, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_VERY_BAD", F_BRAIN_WALLET_VERY_BAD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_BAD", F_BRAIN_WALLET_BAD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_VERY_WEAK", F_BRAIN_WALLET_VERY_WEAK, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_WEAK", F_BRAIN_WALLET_WEAK, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_STILL_WEAK", F_BRAIN_WALLET_STILL_WEAK, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_MAYBE_GOOD", F_BRAIN_WALLET_MAYBE_GOOD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_GOOD", F_BRAIN_WALLET_GOOD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_VERY_GOOD", F_BRAIN_WALLET_VERY_GOOD, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_NICE", F_BRAIN_WALLET_NICE, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BRAIN_WALLET_PERFECT", F_BRAIN_WALLET_PERFECT, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("VALUE_TO_SEND", VALUE_TO_SEND, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("VALUE_TO_RECEIVE", VALUE_TO_RECEIVE, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BALANCE_RAW_128", BALANCE_RAW_128, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BALANCE_REAL_STRING", BALANCE_REAL_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("BALANCE_RAW_STRING", BALANCE_RAW_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("VALUE_SEND_RECEIVE_RAW_128", VALUE_SEND_RECEIVE_RAW_128, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("VALUE_SEND_RECEIVE_REAL_STRING", VALUE_SEND_RECEIVE_REAL_STRING, CONST_CS|CONST_PERSISTENT);
   REGISTER_LONG_CONSTANT("VALUE_SEND_RECEIVE_RAW_STRING", VALUE_SEND_RECEIVE_RAW_STRING, CONST_CS|CONST_PERSISTENT);
   f_random_attach(gen_rand_no_entropy);

   return SUCCESS;

}

PHP_MSHUTDOWN_FUNCTION(mynanoembedded)
{
   f_random_detach();
   return SUCCESS;
}

PHP_MINFO_FUNCTION(mynanoembedded)
{
    php_info_print_table_start();

    php_info_print_table_header(2, LIBRARY_NAME, LIBRARY_VERSION_STR);
    php_info_print_table_row(2, FENIX_SUPPORT_DESC, FENIX_SUPPORT_STATUS);
    php_info_print_table_row(2, BIP39_SUPPORT_DESC, BIP39_SUPPORT_STATUS);
    php_info_print_table_row(2, BRAIN_WALLET_SUPPORT_DESC, BRAIN_WALLET_SUPPORT_STATUS);
    php_info_print_table_row(2, PROOF_OF_WORK_SUPPORT_DESC, PROOF_OF_WORK_SUPPORT_STATUS);
    php_info_print_table_row(2, DPOW_SUPPORT_DESC, DPOW_SUPPORT_STATUS);
    php_info_print_table_row(2, P2POW_SUPPORT_DESC, P2POW_SUPPORT_STATUS);
    php_info_print_table_row(2, MULTI_THREAD_SUPPORT_DESC, MULTI_THREAD_SUPPORT_STATUS);
    php_info_print_table_row(2, VERSION_STR, VERSION_VALUE_STR);
    php_info_print_table_row(2, CONTACT_STR_DESC, CONTACT_STR_STATUS);
    php_info_print_table_row(2, LICENSE_STR, LICENSE_STR_STATUS);
    php_info_print_table_row(2, AUTHOR_STR, AUTHOR_STR_STATUS);
    php_info_print_table_end();
}

PHP_FUNCTION(php_c_nano_check_sig)
{
   int err;
   unsigned char *msg;
   unsigned char *publickey;
   unsigned char *signature;
   uint32_t type;
   size_t msg_len;
   size_t publickey_len;
   size_t signature_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "sss", &signature, &signature_len, &msg, &msg_len, &publickey, &publickey_len)==FAILURE) return;

   if (signature_len!=128) {
      zend_throw_exception(f_exception_ce, "Wrong signature size", 15000);
      return;
   }

   if (msg_len!=64) {
      zend_throw_exception(f_exception_ce, "Invalid hash size", 15001);
      return;
   }

   if (publickey_len>MAX_STR_NANO_CHAR) {

      zend_throw_exception(f_exception_ce , "Max size exceeded in Nano/XRB Public key wallet", 15002);

      return;

   }

   ((is_nano_prefix((const char *)publickey, NANO_PREFIX))||(is_nano_prefix((const char *)publickey, XRB_PREFIX)))?
      (type=F_VERIFY_SIG_NANO_WALLET):(type=F_VERIFY_SIG_ASCII_HEX);

   if ((err=(f_verify_signed_data(
      (const unsigned char *)signature,
      (const unsigned char *)msg,
      64,
      (const void *)publickey,
      type|F_IS_SIGNATURE_RAW_HEX_STRING|F_MESSAGE_IS_HASH_STRING)))>0)
      RETURN_TRUE;

   if (err) {

      sprintf(msg, "Internal error in 'f_verify_signed_data' %d", err);
      zend_throw_exception(f_exception_ce, msg, (zend_long)err);
      return;

   }

   RETURN_FALSE;

}

static const zend_function_entry mynanoembedded_functions[] = {

    PHP_FE(php_c_nano_check_sig, My_NanoCEmbedded_Sig_Parm)
    PHP_FE(php_c_nano_proof_of_work, My_NanoCEmbedded_PoW)
    PHP_FE(php_c_nano_verify_work, My_NanoCEmbedded_Verify_Work)
    PHP_FE(php_c_nano_wallet_to_public_key, My_NanoCEmbedded_NanoWallet)
    PHP_FE(php_c_public_key_to_nano_wallet, My_NanoCEmbedded_Public_Key_2_Nano_Wallet)
    PHP_FE(php_c_convert_balance, My_NanoCEmbedded_ConvertBalance)
    PHP_FE(php_c_generate_seed, My_NanoCEmbedded_GenerateSeed)
    PHP_FE(php_c_get_entropy_name, My_NanoCEmbedded_Entropy)
    PHP_FE(php_c_nano_seed_to_bip39, My_NanoCEmbedded_NanoSeedToBip39)
    PHP_FE(php_c_bip39_to_nano_seed, My_NanoCEmbedded_Bip39ToNanoSeed)
    PHP_FE(php_c_seed_to_nano_key_pair, My_NanoCEmbedded_NanoSeedToNanoKeyPair)
    PHP_FE(php_c_add_sub_balance, My_NanoCEmbedded_AddSubBalance)
    PHP_FE(php_c_compare, My_NanoCEmbedded_Compare)
    PHP_FE(php_c_brainwallet_generate, My_NanoCEmbedded_Brainwallet)
    PHP_FE(php_c_generate_token, My_NanoCEmbedded_GenerateToken)
    PHP_FE(php_c_verify_token, My_NanoCEmbedded_VerifyToken)
    PHP_FE(php_c_license, My_NanoCEmbedded_None)
    PHP_FE(php_c_library_info, My_NanoCEmbedded_None)
    PHP_FE(php_c_to_multiplier, My_NanoCEmbedded_ToMultiplier)
    PHP_FE(php_c_from_multiplier, My_NanoCEmbedded_FromMultiplier)
    PHP_FE(php_c_generate_block, My_NanoCEmbedded_GenerateBlock)
    PHP_FE(php_c_sign_block, My_NanoCEmbedded_SignBlock)
    PHP_FE(php_c_get_account_from_block, My_NanoCEmbedded_ExtractPkOrLinkFromBlock)
    PHP_FE(php_c_get_representative_from_block, My_NanoCEmbedded_ExtractPkOrLinkFromBlock)
    PHP_FE(php_c_get_link_from_block, My_NanoCEmbedded_ExtractPkOrLinkFromBlock)
    PHP_FE(php_c_get_previous_from_block, My_NanoCEmbedded_GetPrevious)
    PHP_FE(php_c_get_balance_from_block, My_NanoCEmbedded_GetBalance)
    PHP_FE(php_c_get_signature_from_block, My_NanoCEmbedded_GetSignature)
    PHP_FE(php_c_get_prefixes_from_block, My_NanoCEmbedded_GetPrefixes)
    PHP_FE(php_c_get_work_from_block, My_NanoCEmbedded_GetWork)
    PHP_FE_END

};

PHP_FUNCTION(php_c_license)
{
   RETURN_STR(strpprintf(sizeof(LICENSE), "%s", LICENSE));
}

PHP_FUNCTION(php_c_library_info)
{
   RETURN_STR(strpprintf(sizeof(LIBRARY_INFO_JSON), "%s", LIBRARY_INFO_JSON));
}

#define NANO_PARSE_FORMAT_UTIL_ACCOUNT (int)(1<<0)
#define NANO_PARSE_FORMAT_UTIL_REPRESENTATIVE (int)(1<<1)
#define NANO_PARSE_FORMAT_UTIL_LINK (int)(1<<2)
int nano_wallet_parse_format_util(char *msg, zval *z_block, int extract, zend_long type, unsigned char *prefix, size_t prefix_len, const char *on_error_fn_name)
{

   int err;
   uint8_t *p;
//msg must be a buffer with 512 bytes !

   if (Z_TYPE_P(z_block)!=IS_STRING) {

      sprintf(msg, "Internal error in C function '%s' 16300. User block is not raw data", on_error_fn_name);

      zend_throw_exception(f_exception_ce, msg, 16300);

      return 1;

   }

   if (Z_STRLEN_P(z_block)!=sizeof(F_BLOCK_TRANSFER)) {

      sprintf(msg, "Internal error in C function '%s' 16301. Invalid user block size", on_error_fn_name);

      zend_throw_exception(f_exception_ce, msg, 16301);

      return 2;

   }

   if (extract&NANO_PARSE_FORMAT_UTIL_LINK)
      p=((F_BLOCK_TRANSFER *)Z_STRVAL_P(z_block))->link;
   else if (extract&NANO_PARSE_FORMAT_UTIL_REPRESENTATIVE)
      p=((F_BLOCK_TRANSFER *)Z_STRVAL_P(z_block))->representative;
   else
      p=((F_BLOCK_TRANSFER *)Z_STRVAL_P(z_block))->account;

   if (type)
      f_nano_key_to_str(msg, (unsigned char *)p);
   else {

      if (prefix_len>(sizeof(NANO_PREFIX)-1)) {

         sprintf(msg, "Internal error in C function '%s' 16302. Prefix length size %lu", on_error_fn_name, (unsigned long int)prefix_len);

         zend_throw_exception(f_exception_ce, msg, 16302);

         return 3;

      }

      if (!is_nano_prefix((const char *)prefix, NANO_PREFIX))
         if (!is_nano_prefix((const char *)prefix, XRB_PREFIX)) {

            sprintf(msg, "Internal error in C function '%s' 16304. Invalid Nano prefix %s", on_error_fn_name, (const char *)prefix);

            zend_throw_exception(f_exception_ce, msg, 16304);

            return 4;

         }

      if ((err=pk_to_wallet(msg, (char *)prefix, (uint8_t *)memcpy(msg+256, p, 32)))) {

         sprintf(msg, "Internal error in C function '%s' %d. Can not parse public key to Nano wallet with prefix %s", on_error_fn_name, err, 
            (const char *)prefix);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return err;

      }

   }

   return 0;

}

PHP_FUNCTION(php_c_get_account_from_block)
{

   char msg[512];
   zval *z_block;
   zend_long type=0;
   unsigned char *prefix=NANO_PREFIX;
   size_t prefix_len=(sizeof(NANO_PREFIX)-1);

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z|l|s", &z_block, &type, &prefix, &prefix_len)==FAILURE)
      return;

   if (nano_wallet_parse_format_util(msg, z_block, NANO_PARSE_FORMAT_UTIL_ACCOUNT, type, prefix, prefix_len, "php_c_get_account_from_block"))
      return;

   RETURN_STR(strpprintf(MAX_STR_NANO_CHAR, "%s", msg));

}

PHP_FUNCTION(php_c_get_representative_from_block)
{

   char msg[512];
   zval *z_block;
   zend_long type=0;
   unsigned char *prefix=NANO_PREFIX;
   size_t prefix_len=(sizeof(NANO_PREFIX)-1);

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z|l|s", &z_block, &type, &prefix, &prefix_len)==FAILURE)
      return;

   if (nano_wallet_parse_format_util(msg, z_block, NANO_PARSE_FORMAT_UTIL_REPRESENTATIVE, type, prefix, prefix_len, "php_c_get_representative_from_block"))
      return;

   RETURN_STR(strpprintf(MAX_STR_NANO_CHAR, "%s", msg));

}

PHP_FUNCTION(php_c_get_link_from_block)
{

   char msg[512];
   zval *z_block;
   zend_long type=0;
   unsigned char *prefix=NANO_PREFIX;
   size_t prefix_len=(sizeof(NANO_PREFIX)-1);

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z|l|s", &z_block, &type, &prefix, &prefix_len)==FAILURE)
      return;

   if (nano_wallet_parse_format_util(msg, z_block, NANO_PARSE_FORMAT_UTIL_LINK, type, prefix, prefix_len, "php_c_get_link_from_block"))
      return;

   RETURN_STR(strpprintf(MAX_STR_NANO_CHAR, "%s", msg));

}

#define NANO_GET_UTIL_PREVIOUS (uint32_t)(1<<8)
#define NANO_GET_UTIL_SIGNATURE (uint32_t)(1<<9)
#define NANO_GET_UTIL_PREFIXES (uint32_t)(1<<10)
#define NANO_GET_UTIL_WORK (uint32_t)(1<<11)
#define MSG_BUF_SZ (size_t)512
int nano_get_util(char *msg, zval *z_block, uint32_t extract, const char *on_error_fn_name)
{

   int err;
   F_BLOCK_TRANSFER *block;

   if (Z_TYPE_P(z_block)!=IS_STRING) {

      sprintf(msg, "Internal error in C function '%s' 17000. User block is not raw data", on_error_fn_name);

      zend_throw_exception(f_exception_ce, msg, 17000);

      return 1;

   }

   if (Z_STRLEN_P(z_block)!=sizeof(F_BLOCK_TRANSFER)) {

      sprintf(msg, "Internal error in C function '%s' 17001. Invalid user block size", on_error_fn_name);

      zend_throw_exception(f_exception_ce, msg, 17001);

      return 2;

   }

   block=(F_BLOCK_TRANSFER *)Z_STRVAL_P(z_block);

   if (extract&NANO_GET_UTIL_PREVIOUS)
      f_nano_key_to_str(msg, (unsigned char *)block->previous);
   else if (extract&BALANCE_REAL_STRING) {

      if ((err=f_nano_raw_to_string(msg, NULL, MSG_BUF_SZ, block->balance, F_RAW_TO_STR_UINT128))) {

         sprintf(msg, "Internal error in C function '%s' %d. Can't parse raw 128 bit balance to real string 'f_nano_raw_to_string' ", on_error_fn_name, err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return err;

      }

   } else if (extract&BALANCE_RAW_STRING) {

      if ((err=f_nano_balance_to_str(msg, MSG_BUF_SZ, NULL, block->balance))) {

         sprintf(msg, "Internal error in C function '%s' %d. Can't parse raw 128 bit balance to raw string 'f_nano_balance_to_str' ", on_error_fn_name, err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return err;

      }

   } else if (extract&BALANCE_RAW_128)
      fhex2strv2(msg, block->balance, 16, 0);
   else if (extract&NANO_GET_UTIL_SIGNATURE)
      fhex2strv2(msg, block->signature, 64, 1);
   else if (extract&NANO_GET_UTIL_PREFIXES)
      sprintf(msg, "%d", (int)block->prefixes);
   else if (extract&NANO_GET_UTIL_WORK)
      sprintf(msg, "0x%016llx", (unsigned long long int)block->work);

   return 0;

}

PHP_FUNCTION(php_c_get_previous_from_block)
{

   char msg[MSG_BUF_SZ];
   zval *z_block;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z", &z_block)==FAILURE)
      return;

   if (nano_get_util(msg, z_block, NANO_GET_UTIL_PREVIOUS, "php_c_get_previous_from_block"))
      return;

   ZVAL_STRING(return_value, msg);

}

PHP_FUNCTION(php_c_get_balance_from_block)
{

   char msg[MSG_BUF_SZ];;
   zval *z_block;
   zend_long balance_type=BALANCE_REAL_STRING;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z|l", &z_block, &balance_type)==FAILURE)
      return;

   if ((((uint32_t)balance_type)&(BALANCE_RAW_128|BALANCE_REAL_STRING|BALANCE_RAW_STRING))==0) {

      sprintf(msg, "Internal error in C function 'php_c_get_balance_from_block' 17002. Invalid raw balance type %lu", (unsigned long int)balance_type);

      zend_throw_exception(f_exception_ce, msg, 17002);

      return;

   }

   if (nano_get_util(msg, z_block, (uint32_t)balance_type, "php_c_get_balance_from_block"))
      return;

   ZVAL_STRING(return_value, msg);

}

PHP_FUNCTION(php_c_get_signature_from_block)
{

   char msg[MSG_BUF_SZ];
   zval *z_block;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z", &z_block)==FAILURE)
      return;

   if (nano_get_util(msg, z_block, NANO_GET_UTIL_SIGNATURE, "php_c_get_signature_from_block"))
      return;

   ZVAL_STRING(return_value, msg);

}

PHP_FUNCTION(php_c_get_prefixes_from_block)
{

   char msg[MSG_BUF_SZ];
   zval *z_block;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z", &z_block)==FAILURE)
      return;

   if (nano_get_util(msg, z_block, NANO_GET_UTIL_PREFIXES, "php_c_get_prefixes_from_block"))
      return;

   ZVAL_STRING(return_value, msg);

}

PHP_FUNCTION(php_c_get_work_from_block)
{

   char msg[MSG_BUF_SZ];
   zval *z_block;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "z", &z_block)==FAILURE)
      return;

   if (nano_get_util(msg, z_block, NANO_GET_UTIL_WORK, "php_c_get_work_from_block"))
      return;

   ZVAL_STRING(return_value, msg);

}

PHP_FUNCTION(php_c_generate_block)
{

   int err;
   char msg[512];
   unsigned char *account, *previous, *representative, *balance, *value_send_rec, *link;
   size_t account_len, previous_len, representative_len, balance_len, value_send_rec_len, link_len;
   uint32_t add_sub_type;
   char *pA, *pB;
   zend_long balance_type, value_send_rec_type, direction;
   F_BLOCK_TRANSFER block;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "sssslslsl", &account, &account_len, &previous, &previous_len, &representative,
      &representative_len, &balance, &balance_len, &balance_type, &value_send_rec, &value_send_rec_len, &value_send_rec_type,
      &link, &link_len, &direction)==FAILURE) return;

   if (account_len==0) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16100. Account can not be empty string");
      zend_throw_exception(f_exception_ce, msg, 16100);

      return;

   }

//php -r "echo bin2hex(php_c_generate_block('nano_14cuejfpr58epnpxenirusimsrbwxbecin7a3izq1injptecc31qsjwquoe6', '', 'nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k', '10', BALANCE_REAL_STRING, '3', VALUE_SEND_RECEIVE_REAL_STRING, 'nano_3x4ui45q1cw8hydmfdn4ec5ijsdqi4ryp14g4ayh71jcdkwmddrq7ca9xzn9', VALUE_TO_SEND));"

   if (representative_len==0) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16103. Representative account can not be empty string");
      zend_throw_exception(f_exception_ce, msg, 16103);

      return;

   }

   if (link_len==0) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16104. Link or destination wallet can not be empty string");
      zend_throw_exception(f_exception_ce, msg, 16104);

      return;

   }

   if (balance_len==0) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16110. Balance value can not be an empty string");

      zend_throw_exception(f_exception_ce, msg, 16110);

      return;

   }

   if (value_send_rec_len==0) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16111. Value to send/receive can not be an empty string");

      zend_throw_exception(f_exception_ce, msg, 16111);

      return;

   }

   if (direction==VALUE_TO_SEND)
      add_sub_type=F_NANO_SUB_A_B;
   else if (direction==VALUE_TO_RECEIVE)
      add_sub_type=F_NANO_ADD_A_B;
   else {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16112. Invalid direction. Select send amout or receive amount");

      zend_throw_exception(f_exception_ce, msg, 16112);

      return;

   }

   if ((uint32_t)balance_type&BALANCE_RAW_128) {

      if (balance_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16113. Big number in balance must be 16 bytes long. Wrong length: '%lu'",
                 (unsigned long int)balance_len);

         zend_throw_exception(f_exception_ce, msg, 16113);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pA=msg), (char *)balance))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse balance '%s' raw Nano big number", err, (const char *)balance);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else
      pA=(char *)balance;

   if ((uint32_t)value_send_rec_type&VALUE_SEND_RECEIVE_RAW_128) {

      if (value_send_rec_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16114. Big number in value to send/receive must be 16 bytes long. Wrong length: '%lu'",
                 (unsigned long int)value_send_rec_len);

         zend_throw_exception(f_exception_ce, msg, 16114);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pB=msg+32), (char *)value_send_rec))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse value to send/receive '%s' raw Nano big number",
            err, (const char *)value_send_rec);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else
      pB=(char *)value_send_rec;

   add_sub_type|=(F_NANO_RES_RAW_128|(uint32_t)balance_type|(uint32_t)value_send_rec_type);
   memset(block.preamble, 0, (sizeof(block.preamble)-1));
   block.preamble[31]=0x06;
   block.prefixes=0;

   if (((err=is_nano_prefix((const char *)account, NANO_PREFIX)))?(err<<=1):(err=is_nano_prefix((const char *)account, XRB_PREFIX))) {

      if (account_len>(MAX_STR_NANO_CHAR-1)) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16101. Account wallet length %lu exceeds maximum length", account_len);
         zend_throw_exception(f_exception_ce, msg, 16101);

         return;

      }

      if (err&1)
         block.prefixes=SENDER_XRB;

      if ((err=nano_base_32_2_hex(block.account, strncpy(msg, (const char *)account, MAX_STR_NANO_CHAR)))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse account wallet '%s' to public key", err, (const char *)account);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else if (account_len==64) {

      if ((err=f_str_to_hex(block.account, (char *)account))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse account '%s' Nano block", err, (const char *)account);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16102. Invalid length %lu in Nano account", account_len);

      zend_throw_exception(f_exception_ce, msg, 16102);

      return;

   }

   if (((err=is_nano_prefix((const char *)representative, NANO_PREFIX)))?(err<<=1):(err=is_nano_prefix((const char *)representative, XRB_PREFIX))) {

      if (representative_len>(MAX_STR_NANO_CHAR-1)) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16105. Representative wallet length %lu exceeds maximum length", representative_len);
         zend_throw_exception(f_exception_ce, msg, 16105);

         return;

      }

      if (err&1)
         block.prefixes|=REP_XRB;

      if ((err=nano_base_32_2_hex(block.representative, strncpy(msg, (const char *)representative, MAX_STR_NANO_CHAR)))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse representative wallet '%s' to public key", err,
            (const char *)representative);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else if (representative_len==64) {

      if ((err=f_str_to_hex(block.representative, (char *)representative))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse representative '%s' to Nano block", err,
            (const char *)representative);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16106. Invalid length %lu in Nano representative", representative_len);

      zend_throw_exception(f_exception_ce, msg, 16106);

      return;

   }

   if (((err=is_nano_prefix((const char *)link, NANO_PREFIX)))?(err<<=1):(err=is_nano_prefix((const char *)link, XRB_PREFIX))) {

      if (link_len>(MAX_STR_NANO_CHAR-1)) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16107. Destination wallet length %lu exceeds maximum length", link_len);
         zend_throw_exception(f_exception_ce, msg, 16107);

         return;

      }

      if (err&1)
         block.prefixes|=DEST_XRB;

      if ((err=nano_base_32_2_hex(block.link, strncpy(msg, (const char *)link, MAX_STR_NANO_CHAR)))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse destination wallet '%s' to public key", err,
            (const char *)link);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else if (link_len==64) {

      if ((err=f_str_to_hex(block.link, (char *)link))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse link '%s' to Nano block", err, (const char *)link);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' 16108. Invalid length %lu in link", link_len);

      zend_throw_exception(f_exception_ce, msg, 16108);

      return;

   }

   if (previous_len) {

      if (previous_len!=64) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' 16109. Invalid length %lu in previous", previous_len);

         zend_throw_exception(f_exception_ce, msg, 16109);

         return;

      }

      if ((err=f_str_to_hex(block.previous, (char *)previous))) {

         sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not parse previous to Nano block", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else
      memset(block.previous, 0, sizeof(block.previous));

   if ((err=f_nano_add_sub(block.balance, pA, pB, add_sub_type))) {

      sprintf(msg, "Internal error in C function 'php_c_generate_block' %d. Can not ADD/SUB Nano big number. Error in 'f_nano_add_sub'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   block.work=0;
   memset(block.signature, 0, sizeof(block.signature));

   ZVAL_STRINGL(return_value, (char *)&block, sizeof(block));

}

PHP_FUNCTION(php_c_sign_block)
{

   int err;
   char msg[768];
   zval *z_user_block, *z_fee_block;
   F_BLOCK_TRANSFER *user_block, *fee_block;
   unsigned char *private_key;
   size_t private_key_len;
   zend_uchar type;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "zzs", &z_user_block, &z_fee_block, &private_key, &private_key_len)==FAILURE)
      return;

   if (private_key_len!=128) {

      sprintf(msg, "Internal error in C function 'php_c_sign_block' 16200. Invalid private key size");

      zend_throw_exception(f_exception_ce, msg, 16200);

      return;

   }

   if (Z_TYPE_P(z_user_block)!=IS_STRING) {

      sprintf(msg, "Internal error in C function 'php_c_sign_block' 16201. User block is not raw data");

      zend_throw_exception(f_exception_ce, msg, 16201);

      return;

   }

   if (Z_STRLEN_P(z_user_block)!=sizeof(F_BLOCK_TRANSFER)) {

      sprintf(msg, "Internal error in C function 'php_c_sign_block' 16202. Invalid user block size");

      zend_throw_exception(f_exception_ce, msg, 16202);

      return;

   }

   user_block=(F_BLOCK_TRANSFER *)Z_STRVAL_P(z_user_block);

   if ((type=Z_TYPE_P(z_fee_block))==IS_STRING) {

      if (Z_STRLEN_P(z_user_block)!=sizeof(F_BLOCK_TRANSFER)) {

         sprintf(msg, "Internal error in C function 'php_c_sign_block' 16203. Invalid fee block size");

         zend_throw_exception(f_exception_ce, msg, 16203);

         return;

      }

      fee_block=(F_BLOCK_TRANSFER *)Z_STRVAL_P(z_fee_block);

   } else if ((type=Z_TYPE_P(z_fee_block))==IS_NULL) fee_block=NULL;
   else {

      sprintf(msg, "Internal error in C function 'php_c_sign_block' 16204. Invalid fee block type");

      zend_throw_exception(f_exception_ce, msg, 16204);

      return;

   }

   memcpy(msg, user_block, sizeof(F_BLOCK_TRANSFER));
   user_block=(F_BLOCK_TRANSFER *)msg;

   if (fee_block) {

      memcpy(msg+sizeof(F_BLOCK_TRANSFER), fee_block, sizeof(F_BLOCK_TRANSFER));
      fee_block=(F_BLOCK_TRANSFER *)(msg+sizeof(F_BLOCK_TRANSFER));

   }

   if ((err=f_str_to_hex((uint8_t *)(msg+2*sizeof(F_BLOCK_TRANSFER)), (char *)private_key))) {

      memset(msg+2*sizeof(F_BLOCK_TRANSFER), 0, 64);

      sprintf(msg, "Internal error in C function 'php_c_sign_block' %d. Can not parse private key string to hex", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if ((err=f_nano_sign_block(user_block, fee_block, (uint8_t *)(msg+2*sizeof(F_BLOCK_TRANSFER))))) {

      sprintf(msg, "Internal error in C function 'php_c_sign_block' %d. Can not sign block(s)", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

   }

   memset(msg+2*sizeof(F_BLOCK_TRANSFER), 0, 64);

   if (err)
      return;

   ZVAL_STRINGL(return_value, (char *)msg, (fee_block)?(2*sizeof(F_BLOCK_TRANSFER)):(sizeof(F_BLOCK_TRANSFER)));

}

PHP_FUNCTION(php_c_from_multiplier)
{

   int err;
   char msg[512];
   unsigned char *base_difficulty;
   size_t base_difficulty_len, double_len;
   uint64_t base_diff;
   double d;
   zval *zv;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "zs", &zv, &base_difficulty, &base_difficulty_len)==FAILURE)
      return;

   if ((err=f_convert_to_long_int_std(&base_diff, (char *)base_difficulty, 24))) {

      sprintf(msg, "Internal error in C function 'php_c_from_multiplier' %d. Can not convert base difficulty with length %lu", err, base_difficulty_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   switch (Z_TYPE_P(zv)) {

      case IS_DOUBLE:

         d=Z_DVAL_P(zv);

         break;

      case IS_LONG:

         d=(double)Z_LVAL_P(zv);

         break;

      case IS_STRING:

         if ((err=f_convert_to_double(&d, strncpy(msg, (const char *)Z_STRVAL_P(zv), double_len=(Z_STRLEN_P(zv)+1))))) {

            sprintf(msg, "Internal error in C function 'php_c_from_multiplier' %d. Can not parse string with length %lu to double", err, double_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         break;

      default:

         sprintf(msg, "Internal error in C function 'php_c_from_multiplier' %d. Unknown type. Multiplier must be double or real string value", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

   }

   RETURN_STR(strpprintf(32, "0x%016llx", (unsigned long long int)from_multiplier(d, base_diff)));

}

PHP_FUNCTION(php_c_to_multiplier)
{

   int err;
   char msg[512];
   unsigned char *difficulty, *base_difficulty;
   size_t difficulty_len, base_difficulty_len;
   unsigned long int diff, base_diff;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss", &difficulty, &difficulty_len, &base_difficulty, &base_difficulty_len)==FAILURE)
      return;

   if ((err=f_convert_to_long_int_std(&diff, (char *)difficulty, 24))) {

      sprintf(msg, "Internal error in C function 'php_c_to_multiplier' %d. Can not convert difficulty with length %lu", err, difficulty_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if ((err=f_convert_to_long_int_std(&base_diff, (char *)base_difficulty, 24))) {

      sprintf(msg, "Internal error in C function 'php_c_to_multiplier' %d. Can not convert base difficulty with length %lu", err, base_difficulty_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_DOUBLE(to_multiplier((uint64_t)diff, (uint64_t)base_diff));

}

PHP_FUNCTION(php_c_generate_token)
{

   int err;
   char msg[512];
   unsigned char *data, *passwd;
   size_t data_len, passwd_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss", &data, &data_len, &passwd, &passwd_len)==FAILURE)
      return;

   if ((err=f_generate_token((uint8_t *)msg, data, data_len, (const char *)passwd))) {

      sprintf(msg, "Internal error in C function 'php_c_generate_token' %d. Can not generate token 'f_generate_token'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(2*sizeof(F_TOKEN)+1, "%s", fhex2strv2(msg+sizeof(F_TOKEN), msg, sizeof(F_TOKEN), 0)));

}

PHP_FUNCTION(php_c_verify_token)
{

   int err;
   char msg[512];
   unsigned char *token, *data, *passwd;
   size_t token_len, data_len, passwd_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "sss", &token, &token_len, &data, &data_len, &passwd, &passwd_len)==FAILURE)
      return;

   if (token_len!=2*sizeof(F_TOKEN)) {

      sprintf(msg, "Internal error in C function 'php_c_verify_token' 16000. Invalid token size '%lu'",
            (unsigned long int)token_len);
      zend_throw_exception(f_exception_ce, msg, 16000);

      return;

   }

   if ((err=f_str_to_hex((uint8_t *)msg, (char *)token))) {

      sprintf(msg, "Internal error in C function 'php_c_verify_token' %d. Can't parse token string to hex in 'f_str_to_hex'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if ((err=f_verify_token((uint8_t *)msg, data, data_len, (const char *)passwd))<0) {

      sprintf(msg, "Internal error in C function 'php_c_verify_token' %d. Can't verify token 'f_verify_token'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (err)
      RETURN_TRUE;

   RETURN_FALSE;

}

PHP_FUNCTION(php_c_brainwallet_generate)
{

   int err;
   char msg[512], *wrn_msg;
   unsigned char *brainwallet, *salt, *dictionary_path;
   size_t brainwallet_len, salt_len, dictionary_path_len;
   zend_long mode;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ssl|s", &brainwallet, &brainwallet_len, &salt, &salt_len, &mode, &dictionary_path, &dictionary_path_len)==FAILURE)
      return;

   if (brainwallet_len>512) {

      sprintf(msg, "Internal error in C function 'php_c_brainwallet_generate' 15900 braiwallet string is too long '%lu'",
            (unsigned long int)brainwallet_len);
      zend_throw_exception(f_exception_ce, msg, 15900);

      return;

   }

   if (salt_len>512) {

      sprintf(msg, "Internal error in C function 'php_c_brainwallet_generate' 15901 salt string is too long '%lu'",
            (unsigned long int)brainwallet_len);
      zend_throw_exception(f_exception_ce, msg, 15901);

      return;

   }

   if ((err=f_extract_seed_from_brainwallet((uint8_t *)(msg+sizeof(msg)-32), &wrn_msg, (uint32_t)mode, (const char *)brainwallet, (const char *)salt))) {

      sprintf(msg, "Internal error in C function 'php_c_brainwallet_generate' %d. In function 'f_extract_seed_from_brainwallet'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (dictionary_path_len)
      f_set_dictionary_path((const char *)dictionary_path);

   if ((err=f_parse_nano_seed_and_bip39_to_JSON(msg, sizeof(msg)-32, NULL, (void *)(msg+sizeof(msg)-32), PARSE_JSON_READ_SEED_GENERIC, NULL))) {

      sprintf(msg, "Internal error in C function 'php_c_brainwallet_generate' %d. In function 'f_parse_nano_seed_and_bip39_to_JSON'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(768, "{\"result\":%s,\"warning_msg\":\"%s\"}", msg, wrn_msg));

}

PHP_FUNCTION(php_c_compare)
{

   int err;
   char msg[512], *pA, *pB;
   unsigned char *valueA, *valueB;
   size_t valueA_len, valueB_len;
   zend_long type, result;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ssl", &valueA, &valueA_len, &valueB, &valueB_len, &type)==FAILURE)
      return;

   if (((uint32_t)type)&F_NANO_A_RAW_128) {

      if (valueA_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_compare' 15800 Error raw Nano big number size F_NANO_A_RAW_128 '%lu'",
            (unsigned long int)valueA_len);

         zend_throw_exception(f_exception_ce, msg, 15800);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pA=msg+128), (char *)valueA))) {

         sprintf(msg, "Internal error in C function 'php_c_compare' F_NANO_A_RAW_128 %d. Cannot convert hex Nano big number to raw big number", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }


   } else
      pA=(char *)valueA;

   if (((uint32_t)type)&F_NANO_B_RAW_128) {

      if (valueB_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_compare' 15801 Error raw Nano big number size F_NANO_B_RAW_128 '%lu'",
            (unsigned long int)valueB_len);

         zend_throw_exception(f_exception_ce, msg, 15801);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pB=msg+256), (char *)valueB))) {

         sprintf(msg, "Internal error in C function 'php_c_compare' F_NANO_B_RAW_128 %d. Cannot convert hex Nano big number to raw big number", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }


   } else
      pB=(char *)valueB;

   *((uint32_t *)(msg+192))=(uint32_t)type;

   if ((err=f_nano_value_compare_value(pA, pB, (uint32_t *)(msg+192)))) {

      sprintf(msg, "Internal error in C function 'php_c_compare' %d. Can not compare these two big numbers", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_LONG(*((uint32_t *)(msg+192))&(F_NANO_COMPARE_EQ|F_NANO_COMPARE_LT|F_NANO_COMPARE_GT));

}

PHP_FUNCTION(php_c_add_sub_balance)
{

   int err;
   char msg[512];
   unsigned char *valueA, *valueB, *pA, *pB;
   size_t valueA_len, valueB_len;
   zend_long type;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ssl", &valueA, &valueA_len, &valueB, &valueB_len, &type)==FAILURE)
      return;

   if (((uint32_t)type)&F_NANO_A_RAW_128) {

      if (valueA_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_add_sub_balance' 15700 Error raw Nano big number size F_NANO_A_RAW_128 '%lu'",
            (unsigned long int)valueA_len);

         zend_throw_exception(f_exception_ce, msg, 15700);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pA=msg+128), (char *)valueA))) {

         sprintf(msg, "Internal error in C function 'php_c_add_sub_balance' F_NANO_A_RAW_128 %d. Cannot convert hex Nano big number to raw big number", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }


   } else
      pA=(char *)valueA;

   if (((uint32_t)type)&F_NANO_B_RAW_128) {

      if (valueB_len!=32) {

         sprintf(msg, "Internal error in C function 'php_c_add_sub_balance' 15701 Error raw Nano big number size F_NANO_B_RAW_128 '%lu'",
            (unsigned long int)valueB_len);

         zend_throw_exception(f_exception_ce, msg, 15701);

         return;

      }

      if ((err=f_str_to_hex((uint8_t *)(pB=msg+256), (char *)valueB))) {

         sprintf(msg, "Internal error in C function 'php_c_add_sub_balance' F_NANO_B_RAW_128 %d. Cannot convert hex Nano big number to raw big number", err);

         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }


   } else
      pB=(char *)valueB;

   if ((err=f_nano_add_sub(msg, pA, pB, (uint32_t)type))) {

      sprintf(msg, "Internal error in C function 'php_c_add_sub_balance' %d. Can not add or sub values in 'f_nano_add_sub'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(64, "%s", ((uint32_t)type&F_NANO_RES_RAW_128)?fhex2strv2((msg+96), msg, sizeof(f_uint128_t), 0):msg));

}

PHP_FUNCTION(php_c_seed_to_nano_key_pair)
{

   int err;
   char msg[768], *p;
   unsigned char *seed, *wallet_number_str, *prefix=NANO_PREFIX;
   size_t seed_len, wallet_number_len, prefix_len=sizeof(NANO_PREFIX)-1;
   uint64_t wallet_number;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss|s", &seed, &seed_len, &wallet_number_str, &wallet_number_len, &prefix, &prefix_len)==FAILURE)
      return;

   if (seed_len!=64) {

      sprintf(msg, "Internal error in C function 'php_c_seed_to_nano_wallet' 15600 wrong Nano SEED size '%lu'", (unsigned long int)seed_len);

      zend_throw_exception(f_exception_ce, msg, 15600);

      return;

   }

    if (wallet_number_len>13) {

       sprintf(msg, "Internal error in C function 'php_c_seed_to_nano_wallet' 15602 wrong wallet number size '%lu'", (unsigned long int)wallet_number_len);

       zend_throw_exception(f_exception_ce, msg, 15602);

       return;

    }

    if (!wallet_number_len) {

      sprintf(msg, "Internal error in C function 'php_c_seed_to_nano_wallet' 15603 wallet number can not be an empty string");

      zend_throw_exception(f_exception_ce, msg, 15603);

      return;

   }

   if ((err=f_convert_to_long_int_std((unsigned long int *)&wallet_number, (char *)wallet_number_str, wallet_number_len+1))) {

      sprintf(msg, "Internal error in C function 'f_convert_to_long_int_std' %d. Can't convert unsigned long int to string 'php_c_seed_to_nano_wallet'", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (wallet_number>((uint64_t)((uint32_t)-1))) {

      sprintf(msg, "Internal error in C function 'php_c_seed_to_nano_wallet' 15604 wallet number can't be greater than (2^32-1). Value parsed '%lu'",
         (unsigned long int)wallet_number);

      zend_throw_exception(f_exception_ce, msg, 15604);

      return;

   }

   if (is_nano_prefix((const char *)prefix, NANO_PREFIX))
      goto php_c_seed_to_nano_wallet_STEP1;

   if (is_nano_prefix((const char *)prefix, XRB_PREFIX))
      goto php_c_seed_to_nano_wallet_STEP1;

   sprintf(msg, "Internal error in C function 'php_c_seed_to_nano_wallet' 15601. Unknown Nano prefix '%s'", (const char *)prefix);

   zend_throw_exception(f_exception_ce, msg, (zend_long)15601);

   return;

php_c_seed_to_nano_wallet_STEP1:

   if ((err=f_str_to_hex((uint8_t *)(p=msg+128), (char *)seed))) {

      sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Cannot convert hex to string in 'php_c_seed_to_nano_wallet' function", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if ((err=f_seed_to_nano_wallet((uint8_t *)msg, (uint8_t *)(msg+64), (uint8_t *)p, (uint32_t)wallet_number))) {

      sprintf(msg, "Internal error in C function 'f_seed_to_nano_wallet' %d. Extract Nano Key pair from seed in 'php_c_seed_to_nano_wallet' function", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }


   strcpy(p, "{\"private_key\":\"");
   strcat(p, f_nano_key_to_str(msg+512, (unsigned char *)msg));
   strcat(p, "\",\"public_key\":\"");
   strcat(p, f_nano_key_to_str(msg+512, (unsigned char *)(msg+64)));
   sprintf(msg+512, "\",\"wallet_number\":\"%u\",\"wallet\":\"", (unsigned int)wallet_number);
   strcat(p, msg+512);

   if ((err=pk_to_wallet(msg+512, (char *)prefix, (uint8_t *)(msg+64)))) {

      sprintf(msg, "Internal error in C function 'f_seed_to_nano_wallet' %d. Parse Nano Public Key to wallet in 'php_c_seed_to_nano_wallet' fail", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   strcat(p, msg+512);
   strcat(p, "\"}");

   RETURN_STR(strpprintf(384, "%s", p));

}

PHP_FUNCTION(php_c_bip39_to_nano_seed)
{
   int err;
   char msg[512];
   unsigned char *bip39, *path;
   size_t bip39_len, path_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss", &bip39, &bip39_len, &path, &path_len)==FAILURE)
      return;

   if (bip39_len>(sizeof(msg)-33)) {

      sprintf(msg, "Internal error in C function 'php_c_bip39_to_nano_seed' 15500 wrong bip39 size '%lu'", (unsigned long int)bip39_len);

      zend_throw_exception(f_exception_ce, msg, 15500);

      return;

   }

   if (!path_len) {

      sprintf(msg, "Internal error in C function 'php_c_bip39_to_nano_seed' 15501. Path cannot be an empty string");

      zend_throw_exception(f_exception_ce, msg, 15501);

      return;

   }

   if ((err=f_bip39_to_nano_seed((uint8_t *)msg, (char *)strncpy(msg+32, (const char *)bip39, sizeof(msg)-33), (char *)path))) {

      sprintf(msg, "Internal error in C function 'php_c_bip39_to_nano_seed' %d. Cannot convert bip39 to Nano seed 'f_bip39_to_nano_seed' function", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(sizeof(msg)-33, "%s", f_nano_key_to_str(msg+32, (unsigned char *)msg)));

}

PHP_FUNCTION(php_c_get_entropy_name)
{

   char msg[64], *p;
   zend_long entropy;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "l", &entropy)==FAILURE)
      return;

   RETURN_STR(strpprintf(sizeof(msg), "%s", (p=f_get_entropy_name((uint32_t)entropy))?p:"Unknown entropy type"));

}

PHP_FUNCTION(php_c_nano_seed_to_bip39)
{
   int err;
   char msg[512];
   unsigned char *seed, *path;
   size_t seed_len, path_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss", &seed, &seed_len, &path, &path_len)==FAILURE)
      return;

   if (seed_len!=64) {

      sprintf(msg, "Internal error in C function 'php_c_nano_seed_to_bip39' 15400 wrong size '%lu'", (unsigned long int)seed_len);

      zend_throw_exception(f_exception_ce, msg, 15400);

      return;

   }

   if ((err=f_str_to_hex((uint8_t *)(msg+sizeof(msg)-32), (char *)seed))) {

      sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Cannot convert hex to string in 'php_c_nano_seed_to_bip39' function", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (!path_len) {

      sprintf(msg, "Internal error in C function 'php_c_nano_seed_to_bip39' 15401. Path cannot be an empty string");

      zend_throw_exception(f_exception_ce, msg, 15401);

      return;

   }

   if ((err=f_nano_seed_to_bip39(msg, sizeof(msg)-32, NULL, (uint8_t *)(msg+sizeof(msg)-32), (char *)path))) {

      sprintf(msg, "Internal error in C function 'f_nano_seed_to_bip39' %d. Cannot parse Nano SEED to Bip39.", err);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(sizeof(msg)-32, "%s", msg));

}

PHP_FUNCTION(php_c_generate_seed)
{
   int err;
   char msg[512], *p;
   zend_long entropy;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "l", &entropy)==FAILURE)
      return;

   if ((err=f_generate_nano_seed((uint8_t *)msg+128, (uint32_t)entropy))) {

      sprintf(msg, "Internal error in C function 'f_generate_nano_seed' %d with entropy type '%s'", err,
         (p=f_get_entropy_name((uint32_t)entropy))?p:"Unknown entropy");

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(65, "%s", f_nano_key_to_str(msg, (unsigned char *)msg+128)));

}

#define F_BUFFER_ADJUST (size_t)2*65
PHP_FUNCTION(php_c_convert_balance)
{

   int err;
   char msg[512];
   unsigned char *balance;
   size_t balance_len, tmp;
   zend_long type;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "sl", &balance, &balance_len, &type)==FAILURE)
      return;

   if (balance_len>F_RAW_STR_MAX_SZ) {

      sprintf(msg, "Internal error in C function 'php_c_convert_balance' 15300. Strange balance length size %lu", (unsigned long int)balance_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)15300);

      return;

   }

   switch (type) {

      case REAL_TO_RAW:
      case REAL_TO_HEX:

         if ((err=f_nano_parse_real_str_to_raw128_t((uint8_t *)msg+F_BUFFER_ADJUST, (const char *)balance))) {

            sprintf(msg, "Internal error in C function 'php_c_convert_balance' %d. Balance '%s' with length size %lu", err, balance, 
               (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         if ((int)type&REAL_TO_RAW) {

            if ((err=f_nano_balance_to_str(msg, F_BUFFER_ADJUST, NULL, msg+F_BUFFER_ADJUST))) {

               sprintf(msg, "Internal error in C function 'f_nano_balance_to_str' %d. Balance '%s' with length size %lu", err, balance, 
                  (unsigned long int)balance_len);

               zend_throw_exception(f_exception_ce, msg, (zend_long)err);

               return;

            }

            break;

         }

         fhex2strv2(msg, (const void *)msg+F_BUFFER_ADJUST, sizeof(f_uint128_t), 0);

         break;

      case RAW_TO_REAL:

         if ((err=f_nano_raw_to_string(msg, NULL, F_BUFFER_ADJUST, balance, F_RAW_TO_STR_STRING))) {

            sprintf(msg, "Internal error in C function 'f_nano_raw_to_string' %d. Balance '%s' with length size %lu", err, balance, 
               (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         break;

      case RAW_TO_HEX:

         if ((err=f_nano_parse_raw_str_to_raw128_t((uint8_t *)(msg+F_BUFFER_ADJUST), (const char *)balance))) {

            sprintf(msg, "Internal error in C function 'f_nano_parse_raw_str_to_raw128_t' %d. Balance '%s' with length size %lu. Can't parse hex to raw balance",
               err, balance, (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         fhex2strv2(msg, msg+F_BUFFER_ADJUST, sizeof(f_uint128_t), 1);

         break;

      case HEX_TO_REAL:
      case HEX_TO_RAW:

         if (balance_len>2*sizeof(f_uint128_t)) {

            sprintf(msg, "Internal error in C function 'php_c_convert_balance' 15302. Balance '%s' with length size %lu. Big number must be 16 bytes long",
               balance, (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, 15302);

            return;

         }

         memset(msg, 0, sizeof(msg));
         tmp=0;

         if (balance_len^2*sizeof(f_uint128_t)) {

            tmp=2*sizeof(f_uint128_t)-balance_len;
            memset(msg+256, '0', tmp);

         }

         if ((err=f_str_to_hex((uint8_t *)msg+F_BUFFER_ADJUST, memcpy(msg+tmp+/*128*/256, balance, balance_len)))) {

            sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Balance '%s' with length size %lu. Can't parse string to hex", err,
               balance, (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         if ((int)type&HEX_TO_REAL) {

            if ((err=f_nano_raw_to_string(msg, NULL, F_BUFFER_ADJUST, msg+F_BUFFER_ADJUST, F_RAW_TO_STR_UINT128))) {

               sprintf(msg, "Internal error in C function 'f_nano_raw_to_string' %d. Balance '%s' with length size %lu. Can't parse hex to real string", err,
                  balance, (unsigned long int)balance_len);

               zend_throw_exception(f_exception_ce, msg, (zend_long)err);

               return;

            }

            break;

         }

         if ((err=f_nano_balance_to_str(msg, F_BUFFER_ADJUST, NULL, (uint8_t *)(msg+F_BUFFER_ADJUST)))) {

            sprintf(msg, "Internal error in C function 'f_nano_balance_to_str' %d. Balance '%s' with length size %lu. Can't parse hex to raw string", err,
               balance, (unsigned long int)balance_len);

            zend_throw_exception(f_exception_ce, msg, (zend_long)err);

            return;

         }

         break;

      default:

         sprintf(msg, "Internal error in C function 'php_c_convert_balance' 15301. Unknown type");

         zend_throw_exception(f_exception_ce, msg, 15301);

         return;

   }

   RETURN_STR(strpprintf(F_BUFFER_ADJUST, "%s", msg));

}

PHP_FUNCTION(php_c_public_key_to_nano_wallet)
{

   int err;
   char msg[512];
   unsigned char *public_key, *prefix=NANO_PREFIX;
   size_t public_key_len, prefix_len=sizeof(NANO_PREFIX)-1;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "s|s", &public_key, &public_key_len, &prefix, &prefix_len)==FAILURE)
      return;

   if (prefix_len>(sizeof(NANO_PREFIX)-1)) {

      sprintf(msg, "Internal error in C function 'php_c_public_key_to_nano_wallet' 15201. Strange Nano prefix size %lu", (unsigned long int)prefix_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)15201);

      return;

   }

   if (is_nano_prefix((const char *)prefix, NANO_PREFIX))
      goto php_c_public_key_to_nano_wallet_STEP1;

   if (is_nano_prefix((const char *)prefix, XRB_PREFIX))
      goto php_c_public_key_to_nano_wallet_STEP1;

   sprintf(msg, "Internal error in C function 'php_c_public_key_to_nano_wallet' 15202. Unknown Nano prefix '%s'", (const char *)prefix);

   zend_throw_exception(f_exception_ce, msg, (zend_long)15202);

   return;

php_c_public_key_to_nano_wallet_STEP1:
   if (public_key_len!=64) {

      sprintf(msg,
         "Internal error in 'php_c_public_key_to_nano_wallet' 15200. Invalid public key length = %lu. Hash should be 64 hex string.",
         (unsigned long int)public_key_len);

      zend_throw_exception(f_exception_ce, msg, 15200);

      return;

   }

   if ((err=f_str_to_hex((unsigned char *)msg, (char *)public_key))) {

      sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Cannot convert string '%s' to hex when parsing public key to Nano Wallet.",
         err, (const char *)public_key);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if ((err=pk_to_wallet(msg+sizeof(NANO_PUBLIC_KEY_EXTENDED), prefix, (uint8_t *)msg))) {

      sprintf(msg, "Internal error in C function 'pk_to_wallet' %d. Cannot parse '%s' to Nano Wallet with prefix %s and prefix length %lu.",
         err, (const char *)public_key, (const char *)prefix, (unsigned long int)prefix_len);

      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(MAX_STR_NANO_CHAR, "%s", msg+sizeof(NANO_PUBLIC_KEY_EXTENDED)));

}

PHP_FUNCTION(php_c_nano_wallet_to_public_key)
{

   int err;
   char msg[512];
   unsigned char *nano_wallet;
   size_t nano_wallet_len;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "s", &nano_wallet, &nano_wallet_len)==FAILURE)
      return;

   if ((err=nano_base_32_2_hex((uint8_t *)msg, strncpy(msg+PUB_KEY_EXTENDED_MAX_LEN, (const char *)nano_wallet, MAX_STR_NANO_CHAR)))) {

      sprintf(msg, "Internal error in 'php_c_nano_wallet_to_public_key' %d. Parse '%s' with length %lu to public key fail.", err, (const char *)nano_wallet,
         (unsigned long int)nano_wallet_len);
      zend_throw_exception(f_exception_ce, msg, err);

      return;

   }

   RETURN_STR(strpprintf(MAX_STR_NANO_CHAR, "%s", f_nano_key_to_str(msg+PUB_KEY_EXTENDED_MAX_LEN, (unsigned char *)msg)));

}

PHP_FUNCTION(php_c_nano_proof_of_work)
{

   int err;
   unsigned int n_thr;
   char msg[512];
   unsigned char *hash, *n_thr_str, *threshold_str=NULL;
   size_t hash_len, n_thr_str_len, threshold_str_len;
   uint64_t threshold, pow_res;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss|s", &hash, &hash_len, &n_thr_str, &n_thr_str_len, &threshold_str, &threshold_str_len)==FAILURE)
      return;

   if (hash_len!=64) {

      sprintf(msg, "Internal error in 'php_c_nano_proof_of_work'. Invalid hash length = %lu. Hash should be 64 hex string.", (unsigned long int)hash_len);
      zend_throw_exception(f_exception_ce, msg, 15100);

      return;

   }

   if ((err=f_str_to_hex((unsigned char *)msg, (char *)hash))) {

      sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Cannot convert string '%s' to hex when perform proof of work.", err, (const char *)hash);
      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (n_thr_str_len>13) {

      sprintf(msg, "Internal error in 'php_c_nano_proof_of_work'. Integer string length is too long");
      zend_throw_exception(f_exception_ce, msg, 15101);

      return;

   }

   if ((err=f_convert_to_unsigned_int_std(&n_thr, (char *)n_thr_str, 13))) {

      sprintf(msg, "Internal error in 'f_convert_to_unsigned_int_std' %d. Cannot convert '%s' with length %ld to unsigned int", err, n_thr_str, n_thr_str_len);
      zend_throw_exception(f_exception_ce, msg, err);

      return;

   }

   if (threshold_str) {

      if (threshold_str_len>24) {

         sprintf(msg, "Internal error in C function. Threshold digit is too long 15102. Length %lu", (unsigned long int)threshold_str_len);
         zend_throw_exception(f_exception_ce, msg, 15102);

         return;

      }

      if ((err=f_convert_to_long_int_std((unsigned long int *)&threshold, (char *)threshold_str, 24))) {

         sprintf(msg, "Internal error in C function 'f_convert_to_long_int_std' %d. Cannot convert threshold string to uint64. String parsed '%s' with length %lu",
            err, (const char *)threshold_str, (unsigned long int)threshold_str_len);
         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

      if (!threshold) {

         sprintf(msg, "Internal error in 'php_c_nano_proof_of_work' 15103. Threshold can not be zero");
         zend_throw_exception(f_exception_ce, msg, 15103);

         return;

      }


   } else
      threshold=F_DEFAULT_THRESHOLD;

//Warning size of zend_long should be as same as uint64_t
   if ((err=f_nano_pow((uint64_t *)&pow_res, (unsigned char *)msg, threshold, n_thr))) {

      sprintf(msg, "Internal error in C function 'f_nano_pow' %d. Proof of Work fail.", err);
      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_STR(strpprintf(256, "{\"pow\":\"0x%016llx\",\"threshold\":\"0x%016llx\",\"multiplier\":\"%0.15f\"}", (unsigned long long int)pow_res,
      (unsigned long long int)threshold, to_multiplier(threshold, F_DEFAULT_THRESHOLD)));

}

PHP_FUNCTION(php_c_nano_verify_work)
{

   int err;
   char msg[512];
   unsigned char *hash, *work_str, *threshold_str=NULL;
   size_t hash_len, work_str_len, threshold_str_len;
   uint64_t work, threshold;

   if (zend_parse_parameters(ZEND_NUM_ARGS(), "ss|s", &hash, &hash_len, &work_str, &work_str_len, &threshold_str, &threshold_str_len)==FAILURE)
      return;

   if (hash_len!=64) {

      sprintf(msg, "Internal error in C function 'php_c_nano_verify_work' 15005. Invalid hash length. %ld",  (long int)hash_len);
      zend_throw_exception(f_exception_ce, msg, 15005);

      return;

   }

   if ((err=f_str_to_hex((unsigned char *)msg, (char *)hash))) {

      sprintf(msg, "Internal error in C function 'f_str_to_hex' %d. Cannot convert string '%s' to hex when verify work.", err, (const char *)hash);
      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   if (threshold_str) {

      if (threshold_str_len>24) {

         sprintf(msg, "Internal error in C function. Threshold digit is too long 15006. Length %lu", (unsigned long int)threshold_str_len);
         zend_throw_exception(f_exception_ce, msg, 15006);

         return;

      }

      if ((err=f_convert_to_long_int_std((unsigned long int *)&threshold, threshold_str, 24))) {

         sprintf(msg, "Internal error in C function 'f_convert_to_long_int_std' %d. Cannot convert threshold string to uint64. String parsed '%s' with length %lu",
            err, (const char *)threshold_str, (unsigned long int)threshold_str_len);
         zend_throw_exception(f_exception_ce, msg, (zend_long)err);

         return;

      }

   } else
      threshold=F_DEFAULT_THRESHOLD;

   if (work_str_len>24) {

      sprintf(msg, "Internal error in C function. Work digit is too long 15007. Length %lu", (unsigned long int)work_str_len);
      zend_throw_exception(f_exception_ce, msg, 15007);

      return;

   }

   if ((err=f_convert_to_long_int_std((unsigned long int *)&work, work_str, 24))) {

      sprintf(msg, "Internal error in C function 'f_convert_to_long_int_std' %d. Cannot convert work string to uint64. String parsed '%s' with length %lu",
         err, (const char *)work_str, (unsigned long int)work_str_len);
      zend_throw_exception(f_exception_ce, msg, err);

      return;

   }

   if ((err=f_verify_work(NULL, (const unsigned char *)msg, &work, threshold))>0)
      RETURN_TRUE;

   if (err) {

      sprintf(msg, "\nInternal error in C function \"f_verify_work\" %d. Verify work fail.", err);
      zend_throw_exception(f_exception_ce, msg, (zend_long)err);

      return;

   }

   RETURN_FALSE;

}

zend_module_entry mynanoembedded_module_entry = {
#if ZEND_MODULE_API_NO >= 20010901
    STANDARD_MODULE_HEADER,
#endif
    "mynanoembedded",
    mynanoembedded_functions,
    PHP_MINIT(mynanoembedded),
    PHP_MSHUTDOWN(mynanoembedded),
    NULL,
    NULL,
    PHP_MINFO(mynanoembedded),
    "1.0",
    STANDARD_MODULE_PROPERTIES
};

#ifdef COMPILE_DL_MYNANOEMBEDDED
ZEND_GET_MODULE(mynanoembedded)
#endif

