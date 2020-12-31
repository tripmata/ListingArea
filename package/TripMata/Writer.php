<?php

    class Writer
    {
        public static function Multiple($characters="", $multiple=1, $seperator="")
        {
            $ret = "";
            for($i = 0; $i < $multiple; $i++)
            {
                $store = $ret == "" ? $characters : $seperator.$characters;
                $ret .= $store;
            }
            return $ret;
        }

        public static function Concat($array=[], $seperator="")
        {
            $ret = "";
            for($i = 0; $i < count($array); $i++)
            {
                $st = $ret === "" ? $array[$i] : $seperator.$array[$i];
                $ret .= $st;
            }
            return $ret;
        }
    }