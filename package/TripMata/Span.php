<?php

    class Span
    {
        public $Start = 0;
        public $Stop = 0;

        function __construct($start=null, $stop=null)
        {
            if($start != null)
            {
                $this->Start = $start;
            }
            if($stop != null)
            {
                $this->Stop = $stop;
            }
        }

        public function Difference()
        {
            return ($this->Stop - $this->Start) > 0 ? $this->Stop - $this->Start : $this->Start - $this->Stop;
        }

        public function splitSpan($places, $intersected=false)
        {
            $div = $this->Difference() / $places;
            $ret = array();

            if($this->Stop > $this->Start)
            {
                $st = $this->Start;

                for($i = 0; $i < $places; $i++)
                {
                    $ret[$i] = new Span($st, ($st + $div));
                    $st += $div;
                }
            }
            else
            {
                $st = $this->Start;

                for($i = 0; $i < $places; $i++)
                {
                    $ret[$i] = new Span($st * ($st - $div));
                    $st -= $div;
                }
            }
            return $ret;
        }
    }