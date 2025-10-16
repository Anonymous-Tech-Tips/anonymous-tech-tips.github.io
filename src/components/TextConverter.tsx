import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RotateCcw, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextConverter: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const convertText = (conversionType: string) => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert",
        variant: "destructive",
      });
      return;
    }

    let converted = "";

    switch (conversionType) {
      case "uppercase":
        converted = inputText.toUpperCase();
        break;
      case "lowercase":
        converted = inputText.toLowerCase();
        break;
      case "titlecase":
        converted = inputText.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "camelcase":
        converted = inputText
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, "");
        break;
      case "snakecase":
        converted = inputText
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join("_");
        break;
      case "kebabcase":
        converted = inputText
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join("-");
        break;
      case "reverse":
        converted = inputText.split("").reverse().join("");
        break;
      case "count":
        const words = inputText.trim().split(/\s+/).length;
        const chars = inputText.length;
        const charsNoSpace = inputText.replace(/\s/g, "").length;
        converted = `Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpace}`;
        break;
      default:
        converted = inputText;
    }

    setOutputText(converted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Converted text copied to clipboard",
      });
    } catch (err) {
      console.error('Copy error:', err);
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5" />
          Text Case Converter
        </CardTitle>
        <CardDescription>
          Convert text between different cases and formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Input Text</Label>
          <Textarea
            id="input-text"
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("uppercase")}
          >
            UPPERCASE
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("lowercase")}
          >
            lowercase
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("titlecase")}
          >
            Title Case
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("camelcase")}
          >
            camelCase
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("snakecase")}
          >
            snake_case
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("kebabcase")}
          >
            kebab-case
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("reverse")}
          >
            Reverse
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => convertText("count")}
          >
            Count
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={clearAll} variant="outline" className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
          <Button
            onClick={copyToClipboard}
            disabled={!outputText}
            variant="outline"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        {outputText && (
          <div className="space-y-2">
            <Label>Converted Text</Label>
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[100px] bg-muted"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
