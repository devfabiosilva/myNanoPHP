dnl config.m4 for Linux PHP 7 extension module
dnl 05/18/2020
dnl Author: Fábio Pereira da Silva
dnl License: MIT

PHP_ARG_WITH(mynanoembedded, Support for NANO cryptocurrency module for PHP,
[  --with-mynanoembedded[=DIR]       Support for NANO cryptocurrency module for PHP])

LIBNAME=nanocrypto1
SODIUM=sodium
DEF_DIR=$(pwd)

if test "$PHP_TEST" != "no"; then
  if test -r $PHP_TEST/lib/lib$LIBNAME.a; then
    TEST_DIR=$PHP_TEST
  else
    AC_MSG_CHECKING(for $LIBNAME and $SODIUM in default path $DEF_DIR)
    for i in $DEF_DIR/lib; do
      if test -r $i/lib$LIBNAME.a; then
        if !(test -r $i/lib$SODIUM.a); then
          AC_MSG_RESULT(Libsodium test failed)
          AC_MSG_ERROR(Libsodium not found. Please reinstall myNanoEmbedded library)
        fi
        TEST_DIR=$i
        AC_MSG_RESULT(found in $i)
      fi
    done
  fi

  if test -z "$TEST_DIR"; then
    AC_MSG_RESULT(not found)
    AC_MSG_ERROR(Please install myNanoEmbedded library)
  fi

  EXTERNAL="$TEST_DIR -lsodium"

  PHP_ADD_INCLUDE($DEF_DIR/include)
  PHP_ADD_INCLUDE($DEF_DIR/include/sodium)
  PHP_ADD_LIBRARY_WITH_PATH($LIBNAME, $TEST_DIR, MYNANOEMBEDDED_SHARED_LIBADD)
  PHP_EVAL_LIBLINE($EXTERNAL, MYNANOEMBEDDED_SHARED_LIBADD)
  PHP_SUBST(MYNANOEMBEDDED_SHARED_LIBADD)
  PHP_NEW_EXTENSION(mynanoembedded, libmynanoembedded.c, $ext_shared)

fi

