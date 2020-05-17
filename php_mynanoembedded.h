/*
 * AUTHOR: Fábio Pereira da Silva
 * YEAR: 2020
 * LICENSE: MIT
 * EMAIL: fabioegel@gmail.com or fabioegel@protonmail.com
 *
 * Header file that integrates Nano cryptocurrency P2PoW/DPoW support with myNanoEmbedded C library for PHP
 *
 */

extern zend_module_entry mynanoembedded_module_entry;

#ifdef ZTS
 #include "TSRM.h"
#endif

PHP_MINIT_FUNCTION(mynanoembedded);
PHP_MSHUTDOWN_FUNCTION(mynanoembedded);
PHP_RINIT_FUNCTION(mynanoembedded);
PHP_RSHUTDOWN_FUNCTION(mynanoembedded);
PHP_MINFO_FUNCTION(mynanoembedded);

PHP_FUNCTION(php_c_get_previous_from_block);
PHP_FUNCTION(php_c_get_balance_from_block);
PHP_FUNCTION(php_c_get_signature_from_block);
PHP_FUNCTION(php_c_get_prefixes_from_block);
PHP_FUNCTION(php_c_get_work_from_block);
PHP_FUNCTION(php_c_get_account_from_block);
PHP_FUNCTION(php_c_get_representative_from_block);
PHP_FUNCTION(php_c_get_link_from_block);
PHP_FUNCTION(php_c_sign_block);
PHP_FUNCTION(php_c_generate_block);
PHP_FUNCTION(php_c_from_multiplier);
PHP_FUNCTION(php_c_to_multiplier);
PHP_FUNCTION(php_c_license);
PHP_FUNCTION(php_c_library_info);
PHP_FUNCTION(php_c_verify_token);
PHP_FUNCTION(php_c_generate_token);
PHP_FUNCTION(php_c_brainwallet_generate);
PHP_FUNCTION(php_c_compare);
PHP_FUNCTION(php_c_add_sub_balance);
PHP_FUNCTION(php_c_nano_check_sig);
PHP_FUNCTION(php_c_seed_to_nano_key_pair);
PHP_FUNCTION(php_c_nano_proof_of_work);
PHP_FUNCTION(php_c_nano_verify_work);
PHP_FUNCTION(php_c_nano_wallet_to_public_key);
PHP_FUNCTION(php_c_public_key_to_nano_wallet);
PHP_FUNCTION(php_c_convert_balance);
PHP_FUNCTION(php_c_generate_seed);
PHP_FUNCTION(php_c_get_entropy_name);
PHP_FUNCTION(php_c_nano_seed_to_bip39);
PHP_FUNCTION(php_c_bip39_to_nano_seed);

#define LIBRARY_NAME "myNanoEmbedded C library for PHP"
#define LIBRARY_VERSION_STR "1.0"

#define FENIX_SUPPORT_DESC "Fenix-IoT protocol support"
#define FENIX_SUPPORT_STATUS "enabled"

#define BIP39_SUPPORT_DESC "Bip39"
#define BIP39_SUPPORT_STATUS "yes"

#define BRAIN_WALLET_SUPPORT_DESC "Brain Wallet Support"
#define BRAIN_WALLET_SUPPORT_STATUS "yes"

#define PROOF_OF_WORK_SUPPORT_DESC "Proof of Work support"
#define PROOF_OF_WORK_SUPPORT_STATUS "yes"

#define DPOW_SUPPORT_DESC "DPoW support"
#define DPOW_SUPPORT_STATUS "yes"

#define P2POW_SUPPORT_DESC "P2PoW support"
#define P2POW_SUPPORT_STATUS "yes"

#define MULTI_THREAD_SUPPORT_DESC "Multithread for Proof of Work Support"
#define MULTI_THREAD_SUPPORT_STATUS "yes"

#define VERSION_STR "Version"
#define VERSION_VALUE_STR "1.0"

#define CONTACT_STR_DESC "Contact"
#define CONTACT_STR_STATUS "fabioegel@protonmail.com"

#define LICENSE_STR "LICENSE"
#define LICENSE_STR_STATUS "MIT"

#define AUTHOR_STR "Author"
#define AUTHOR_STR_STATUS "Fábio Pereira da Silva"

#define LIBRARY_INFO_JSON "{\"name\":\""LIBRARY_NAME"\",\"version\":\""LIBRARY_VERSION_STR"\",\"fenix_protocol_support\":\""FENIX_SUPPORT_STATUS"\",\
\"bip39_support\":\""BIP39_SUPPORT_STATUS"\",\"brain_wallet_support\":\""BRAIN_WALLET_SUPPORT_STATUS"\",\"proof_of_work\":\""PROOF_OF_WORK_SUPPORT_STATUS"\",\
\"dpow_support\":\""P2POW_SUPPORT_STATUS"\",\"p2pow_support\":\""P2POW_SUPPORT_STATUS"\",\"multithread_support\":\""MULTI_THREAD_SUPPORT_STATUS"\",\"contact\":\""\
CONTACT_STR_STATUS"\",\"license\":\""LICENSE_STR_STATUS"\",\"author\":\""AUTHOR_STR_STATUS"\"}"

