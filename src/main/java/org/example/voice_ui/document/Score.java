package org.example.voice_ui.document;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Document
@AllArgsConstructor
public class Score extends AbstractDocument {
    @Min(0)
    private Integer score;
    private String login;
}
