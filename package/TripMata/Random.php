<?php

    class Random
    {
        public static function GenerateId($length = 8, $type="alphanumeric")
        {
            $ret = "";
            for($i = 0; $i < $length; $i++)
            {
                if(strtolower($type) == "alphanumeric")
                {
                    $ch = mt_rand(0, 1);
                    if($ch == 0)
                    {
                        $ret .= Random::ToAlphabet(mt_rand(1, 26));
                    }
                    else
                    {
                        $ret .= mt_rand(1, 9);
                    }
                }
                if(strtolower($type) == "numeric")
                {
                    $ret .= mt_rand(1, 9);
                }
                if(strtolower($type) == "alphabetic")
                {
                    $ret .= Random::ToAlphabet(mt_rand(1, 26));
                }
            }
            return $ret;
        }

        public static function ToAlphabet($num)
        {
            $ret = "";

            switch($num)
            {
                case 1:
                    $ret = "a";
                    break;

                case 2:
                    $ret = "b";
                    break;

                case 3:
                    $ret = "c";
                    break;

                case 4:
                    $ret = "d";
                    break;

                case 5:
                    $ret = "e";
                    break;

                case 6:
                    $ret = "f";
                    break;

                case 7:
                    $ret = "g";
                    break;

                case 8:
                    $ret = "h";
                    break;

                case 9:
                    $ret = "i";
                    break;

                case 10:
                    $ret = "j";
                    break;

                case 11:
                    $ret = "k";
                    break;

                case 12:
                    $ret = "l";
                    break;

                case 13:
                    $ret = "m";
                    break;

                case 14:
                    $ret = "n";
                    break;

                case 15:
                    $ret = "o";
                    break;

                case 16:
                    $ret = "p";
                    break;

                case 17:
                    $ret = "q";
                    break;

                case 18:
                    $ret = "r";
                    break;

                case 19:
                    $ret = "s";
                    break;

                case 20:
                    $ret = "t";
                    break;

                case 21:
                    $ret = "u";
                    break;

                case 22:
                    $ret = "v";
                    break;

                case 23:
                    $ret = "w";
                    break;

                case 24:
                    $ret = "x";
                    break;

                case 25:
                    $ret = "y";
                    break;

                case 26:
                    $ret = "z";
                    break;
            }

            return $ret;
        }
    }