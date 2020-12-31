<?php

    class WixDate implements IBase
    {
        protected $Value = "";

        public $Day = 0;
        public $Month = 0;
        public $Year = 0;
        public $Miniute = 0;
        public $Second = 0;
        public $Hour = 0;
        public $WeekDay = "";
        public $MonthName = "";

        function __construct($arg=null)
        {
            if($arg != null)
            {
                if(is_int($arg))
                {
                    $this->Value = $arg;
                }
                else if(is_a($arg, "WixDate"))
                {
                    $this->Value = $arg->getValue();
                }
                else if(is_string($arg) && (count(explode("-", $arg)) > 1))
                {
                    $this->Value = strtotime($arg);
                }
                else if(is_string($arg) && (count(explode("/", $arg)) > 1))
                {
                    $this->Value = strtotime($arg);
                }
                else
                {
                    $this->Value = Convert::ToInt($arg);
                }
            }
            else
            {
                $this->Value = time();
            }


            $this->Day = date("d", $this->Value);
            $this->Month = date("m", $this->Value);
            $this->Year = date("Y", $this->Value);
            $this->Hour = date("h", $this->Value);
            $this->Miniute = date("i", $this->Value);
            $this->Second = date("s", $this->Value);
            $this->WeekDay = date("D", $this->Value);
            $this->MonthName = date("M", $this->Value);
        }

        public function ToBool()
        {
            // TODO: Implement ToBool() method.
        }

        public function ToInt()
        {
            // TODO: Implement ToInt() method.
        }

        public function ToString()
        {
            // TODO: Implement ToString() method.
        }

        public function ToAgo($tm=null)
        {

        }

        public function ToFromNow($tm=null)
        {

        }

        /**
         * @return int|string
         */
        public function getValue()
        {
            return $this->Value;
        }

        /**
         * @param int|string $Value
         */
        public function setValue($Value)
        {
            $this->Value = $Value;
        }
    }