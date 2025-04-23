
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function ZhixingDemo() {
  const [step, setStep] = useState(1);
  const [customZh, setCustomZh] = useState("");
  const [selectedZh, setSelectedZh] = useState([]);
  const [selectedXing, setSelectedXing] = useState([]);
  const [customXing, setCustomXing] = useState("");
  const [bu, setBu] = useState("");

  const zhOptions = [
    "该运动一下了",
    "早点睡觉",
    "回那条消息",
    "别再拖延任务了",
    "主动说句话",
  ];

  const xingOptions = [
    "太懒了",
    "不想面对",
    "怕失败",
    "觉得还不急",
    "没动力",
  ];

  const toggleOption = (option, setter, current) => {
    setter(current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option]);
  };

  const next = () => setStep(step + 1);
  const reset = () => {
    setStep(1);
    setSelectedZh([]);
    setCustomZh("");
    setSelectedXing([]);
    setCustomXing("");
    setBu("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-2">第一步：选一件你知道该做但还没做的事</h2>
              <div className="space-y-2">
                {zhOptions.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox id={`zh-${index}`} checked={selectedZh.includes(item)} onCheckedChange={() => toggleOption(item, setSelectedZh, selectedZh)} />
                    <label htmlFor={`zh-${index}`}>{item}</label>
                  </div>
                ))}
                <Input
                  placeholder="自定义一个（如：该感谢他）"
                  value={customZh}
                  onChange={(e) => setCustomZh(e.target.value)}
                  onBlur={() => {
                    if (customZh.trim()) {
                      toggleOption(customZh.trim(), setSelectedZh, selectedZh);
                      setCustomZh("");
                    }
                  }}
                />
              </div>
              <Button className="mt-4" onClick={next}>下一步</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-2">第二步：「我为啥没做？」</h2>
              <div className="space-y-2">
                {xingOptions.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox id={`xing-${index}`} checked={selectedXing.includes(item)} onCheckedChange={() => toggleOption(item, setSelectedXing, selectedXing)} />
                    <label htmlFor={`xing-${index}`}>{item}</label>
                  </div>
                ))}
                <Input
                  placeholder="自定义一个原因…"
                  value={customXing}
                  onChange={(e) => setCustomXing(e.target.value)}
                  onBlur={() => {
                    if (customXing.trim()) {
                      toggleOption(customXing.trim(), setSelectedXing, selectedXing);
                      setCustomXing("");
                    }
                  }}
                />
              </div>
              <Button className="mt-4" onClick={next}>下一步</Button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-2">第三步：「我现在能做点啥补救？」</h2>
              <Textarea
                placeholder="例：发条消息、走三分钟、打开文档写一行…"
                value={bu}
                onChange={(e) => setBu(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <Button onClick={reset}>重新开始</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {step === 3 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">🎯 今日三问总结</h3>
            <p><strong>知：</strong>{selectedZh.join("，")}</p>
            <p><strong>行：</strong>{selectedXing.join("，")}</p>
            <p><strong>补：</strong>{bu}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
